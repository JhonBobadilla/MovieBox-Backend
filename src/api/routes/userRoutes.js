const express = require('express');
// Importa el controlador para usuarios
const { createUser } = require('../controllers/userController');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para crear un usuario
router.post('/users', createUser);

// Ruta para listar usuarios junto a las películas que han visto
router.get('/peliculas-vistas', userController.listUsuariosConPeliculasVistas);

// Exporta el router
module.exports = router;

