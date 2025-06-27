const PeliculaRepository = require('../../domain/repositories/PeliculaRepository');
const db = require('../database/postgresClient');

class PostgresPeliculaRepository extends PeliculaRepository {
  async create({ titulo, fecha_estreno, categoria_id }) {
    const result = await db.query(
      'INSERT INTO peliculas (titulo, fecha_estreno, categoria_id) VALUES ($1, $2, $3) RETURNING *',
      [titulo, fecha_estreno, categoria_id]
    );
    return result.rows[0];
  }
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

     async findById(id) {
      const result = await db.query('SELECT * FROM peliculas WHERE id = $1', [id]);
      return result.rows[0];
    }

    async delete(id) {
      await db.query('DELETE FROM peliculas WHERE id = $1', [id]);
    }

}

module.exports = PostgresPeliculaRepository;
