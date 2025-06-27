const express = require('express');
const router = express.Router();
const { crearPelicula } = require('../controllers/peliculaController');

router.post('/peliculas', crearPelicula);

module.exports = router;
