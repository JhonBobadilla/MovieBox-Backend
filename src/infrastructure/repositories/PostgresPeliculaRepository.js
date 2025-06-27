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
}

module.exports = PostgresPeliculaRepository;
