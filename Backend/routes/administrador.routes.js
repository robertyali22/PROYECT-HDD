const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administrador.controller');

// Crear nuevo administrador
router.post('/', administradorController.createAdministrador);

// Obtener todos los administradores
router.get('/', administradorController.readAdministradores);

// Obtener un administrador por ID
router.get('/:id', administradorController.readAdministrador);

// Actualizar un administrador
router.put('/:id', administradorController.updateAdministrador);

// Eliminar un administrador
router.delete('/:id', administradorController.deleteAdministrador);

module.exports = router;
// 