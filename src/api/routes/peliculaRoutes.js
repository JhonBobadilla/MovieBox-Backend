const express = require('express');
const router = express.Router();
const { crearPelicula, listPeliculas, listNovedades, marcarComoVista } = require('../controllers/peliculaController');

router.post('/', crearPelicula);

router.get('/', listPeliculas);

router.get('/novedades', listNovedades);

router.post('/vista', marcarComoVista);

module.exports = router;
