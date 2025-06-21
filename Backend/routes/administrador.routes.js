const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administrador.controller');

// Crear nuevo administrador
router.post('/', administradorController.crearAdministrador);

// Obtener todos los administradores
router.get('/', administradorController.obtenerAdministradores);

// Obtener un administrador por ID
router.get('/:id', administradorController.obtenerAdministradorPorId);

// Actualizar un administrador
router.put('/:id', administradorController.actualizarAdministrador);

// Eliminar un administrador
router.delete('/:id', administradorController.eliminarAdministrador);

module.exports = router;
// 