const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Crear nuevo usuario
router.post('/', usuarioController.crearUsuario);

// Obtener todos los usuarios
router.get('/', usuarioController.obtenerUsuarios);

// Obtener un usuario por ID
router.get('/:id', usuarioController.obtenerUsuarioPorId);

// Actualizar un usuario
router.put('/:id', usuarioController.actualizarUsuario);

// Eliminar un usuario
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;
