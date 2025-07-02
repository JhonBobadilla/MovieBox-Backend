const PeliculaRepository = require('../../domain/repositories/PeliculaRepository');
const db = require('../database/postgresClient');

// Implementación concreta del repositorio de películas usando PostgreSQL
class PostgresPeliculaRepository extends PeliculaRepository {
  // Crea una nueva película en la base de datos
  async create({ titulo, fecha_estreno, categoria_id }) {
    const result = await db.query(
      'INSERT INTO peliculas (titulo, fecha_estreno, categoria_id) VALUES ($1, $2, $3) RETURNING *',
      [titulo, fecha_estreno, categoria_id]
    );
    return result.rows[0];
  }

  // Lista películas con filtros de título, categoría, paginación y orden
  async list({ titulo, categoria, page, limit, order }) {
    let params = [];
    let where = [];
    let idx = 1;

    if (titulo) {
      where.push(`p.titulo ILIKE $${idx++}`);
      params.push(`%${titulo}%`);
    }
    if (categoria) {
      where.push(`c.nombre = $${idx++}`);
      params.push(categoria);
    }

    const whereStr = where.length ? 'WHERE ' + where.join(' AND ') : '';
    const offset = (page - 1) * limit;

    const query = `
      SELECT p.*, c.nombre AS categoria_nombre
      FROM peliculas p
      JOIN categorias c ON p.categoria_id = c.id
      ${whereStr}
      ORDER BY p.fecha_estreno ${order === 'asc' ? 'ASC' : 'DESC'}
      LIMIT $${idx++} OFFSET $${idx}
    `;

    params.push(limit, offset);

    const result = await db.query(query, params);

    return result.rows;
  }

  // Lista películas estrenadas en los últimos 21 días (novedades)
  async listNovedades() {
    const query = `
      SELECT p.*, c.nombre AS categoria_nombre
      FROM peliculas p
      JOIN categorias c ON p.categoria_id = c.id
      WHERE p.fecha_estreno >= CURRENT_DATE - INTERVAL '21 days'
      ORDER BY p.fecha_estreno DESC
    `;
    const result = await db.query(query);
    return result.rows;
  }

  // Marca una película como vista por un usuario, evita duplicados con ON CONFLICT
  async marcarComoVista(usuario_id, pelicula_id) {
    const query = `
      INSERT INTO peliculas_vistas (usuario_id, pelicula_id, fecha_vista)
      VALUES ($1, $2, CURRENT_DATE)
      ON CONFLICT (usuario_id, pelicula_id) DO NOTHING
      RETURNING *
    `;
    const result = await db.query(query, [usuario_id, pelicula_id]);
    return result.rows[0];
  }

  // Busca una película por ID
  async findById(id) {
    const result = await db.query('SELECT * FROM peliculas WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Elimina una película por ID
  async delete(id) {
    await db.query('DELETE FROM peliculas WHERE id = $1', [id]);
  }

  // Actualiza datos de una película, solo los campos enviados
  async update(id, updateData) {
    const fields = [];
    const values = [];
    let idx = 1;
    for (const [key, value] of Object.entries(updateData)) {
      fields.push(`${key} = $${idx++}`);
      values.push(value);
    }
    if (fields.length === 0) return null;

    values.push(id);
    const query = `
      UPDATE peliculas SET ${fields.join(', ')}
      WHERE id = $${idx}
      RETURNING *;
    `;
    const result = await db.query(query, values);
    return result.rows[0];
  }
}

module.exports = PostgresPeliculaRepository;

