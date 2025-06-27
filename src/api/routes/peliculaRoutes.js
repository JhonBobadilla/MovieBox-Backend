const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');

router.post('/', peliculaController.crearPelicula);
router.get('/', peliculaController.listPeliculas);
router.get('/novedades', peliculaController.listNovedades);
router.post('/vista', peliculaController.marcarComoVista);
router.delete('/borrar', peliculaController.borrarPelicula);
router.put('/actualizar', peliculaController.actualizarPelicula);

module.exports = router;
