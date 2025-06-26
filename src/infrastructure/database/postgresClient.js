// src/infrastructure/database/postgresClient.js

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';
// Configura el pool de conexión con la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Heroku o .env local
  ssl: isProduction ? { rejectUnauthorized: false } : false, 
});

// Exporta un método para hacer queries de forma segura
module.exports = {
  query: (text, params) => pool.query(text, params),
};
