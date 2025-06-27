const express = require('express');
const { createUser } = require('../controllers/userController');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', createUser);

router.get('/peliculas-vistas', userController.listUsuariosConPeliculasVistas);

module.exports = router;
