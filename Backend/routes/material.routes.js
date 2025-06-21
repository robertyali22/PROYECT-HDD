const express = require('express');
const router = express.Router();
const materialController = require('../controllers/material.controller');

// Crear nuevo material
router.post('/', materialController.crearMaterial);

// Obtener todos los materiales
router.get('/', materialController.obtenerMateriales);

// Obtener un material por ID
router.get('/:id', materialController.obtenerMaterialPorId);

// Actualizar un material
router.put('/:id', materialController.actualizarMaterial);

// Eliminar un material
router.delete('/:id', materialController.eliminarMaterial);

module.exports = router;
