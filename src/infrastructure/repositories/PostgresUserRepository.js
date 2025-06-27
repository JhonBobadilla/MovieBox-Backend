const UserRepository = require('../../domain/repositories/UserRepository');
const db = require('../database/postgresClient'); 

class PostgresUserRepository extends UserRepository {
  async create({ name, email, password, role }) {
    const result = await db.query(
  'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING *',
  [name, email, password, role]
);
    return result.rows[0];
  }

   async findById(id) {
     const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
     return result.rows[0];
  }

}
module.exports = PostgresUserRepository;
