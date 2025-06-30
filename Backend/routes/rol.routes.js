const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol.controller');

// Crear nuevo rol
router.post('/', rolController.createRol);

// Obtener todos los rols
router.get('/', rolController.readRoles);

// Obtener un rol por ID
router.get('/:id', rolController.readRol);

// Actualizar un rol
router.put('/:id', rolController.updateRol);

// Eliminar un rol
router.delete('/:id', rolController.deleteRol);

module.exports = router;
