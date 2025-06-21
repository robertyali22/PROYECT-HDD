const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Crear nuevo usuario
router.post('/', usuarioController.createUsuario);

// Obtener todos los usuarios
router.get('/', usuarioController.readUsuarios);

// Obtener un usuario por ID
router.get('/:id', usuarioController.readUsuario);

// Actualizar un usuario
router.put('/:id', usuarioController.updateUsuario);

// Eliminar un usuario
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
