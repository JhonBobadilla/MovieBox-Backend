// src/infrastructure/db.js
const { Pool } = require('pg');

let pool;

if (process.env.DATABASE_URL) {
  // Configuración para Heroku (producción)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
} else {
  // Configuración para local (desarrollo)
  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'w858504042828',
    database: process.env.DB_NAME || 'moviebox',
    port: process.env.DB_PORT || 5432,
  });
}

module.exports = pool;

