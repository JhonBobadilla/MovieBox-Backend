const UserRepository = require('../../domain/repositories/UserRepository');
const db = require('../database/postgresClient'); 

// Implementación concreta del repositorio de usuarios usando PostgreSQL
class PostgresUserRepository extends UserRepository {
  // Crea un nuevo usuario en la base de datos
  async create({ name, email, password, role }) {
    const result = await db.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, role]
    );
    return result.rows[0];
  }

  // Busca un usuario por su ID
  async findById(id) {
    const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Lista usuarios junto con las películas que han visto y sus categorías
  async listUsuariosConPeliculasVistas() {
    const result = await db.query(`
      SELECT 
        u.id as usuario_id,
        u.nombre,
        u.email,
        json_agg(
          json_build_object(
            'titulo', p.titulo,
            'categoria', c.nombre
          )
        ) as peliculas_vistas
      FROM usuarios u
      LEFT JOIN peliculas_vistas pv ON pv.usuario_id = u.id
      LEFT JOIN peliculas p ON p.id = pv.pelicula_id
      LEFT JOIN categorias c ON c.id = p.categoria_id
      WHERE pv.pelicula_id IS NOT NULL
      GROUP BY u.id, u.nombre, u.email
    `);

    return result.rows;
  }
}

module.exports = PostgresUserRepository;
