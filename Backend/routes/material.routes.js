const express = require('express');
const router = express.Router();
const materialController = require('../controllers/material.controller');

// Crear nuevo material
router.post('/', materialController.createMaterial);

// Obtener todos los materiales
router.get('/', materialController.readMateriales);

// Obtener un material por ID
router.get('/:id', materialController.readMaterial);

// Actualizar un material
router.put('/:id', materialController.updateMaterial);

// Eliminar un material
router.delete('/:id', materialController.deleteMaterial);

module.exports = router;
