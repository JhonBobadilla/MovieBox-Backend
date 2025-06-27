const express = require('express');
const router = express.Router();
const { crearPelicula, listPeliculas } = require('../controllers/peliculaController');

// POST /api/peliculas
router.post('/', crearPelicula);

// GET /api/peliculas
router.get('/', listPeliculas);

module.exports = router;
