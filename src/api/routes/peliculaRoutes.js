const express = require('express');
const router = express.Router();
// Importa el controlador de películas
const peliculaController = require('../controllers/peliculaController');

// Ruta para crear una película
router.post('/', peliculaController.crearPelicula);
// Ruta para listar películas
router.get('/', peliculaController.listPeliculas);
// Ruta para listar novedades (películas recientes)
router.get('/novedades', peliculaController.listNovedades);
// Ruta para marcar una película como vista por un usuario
router.post('/vista', peliculaController.marcarComoVista);
// Ruta para borrar una película
router.delete('/borrar', peliculaController.borrarPelicula);
// Ruta para actualizar datos de una película
router.put('/actualizar', peliculaController.actualizarPelicula);

// Exporta el router para su uso en la app principal
module.exports = router;

