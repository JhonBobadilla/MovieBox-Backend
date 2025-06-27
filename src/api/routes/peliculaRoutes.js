const express = require('express');
const router = express.Router();
const { crearPelicula, listPeliculas, listNovedades } = require('../controllers/peliculaController');

router.post('/', crearPelicula);

router.get('/', listPeliculas);

router.get('/novedades', listNovedades);

module.exports = router;
