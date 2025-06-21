const express = require('express');
const router = express.Router();
const controlCalidadController = require('../controllers/controlCalidad.controller');

// Crear nuevo control de calidad
router.post('/', controlCalidadController.createControlCalidad);

// Obtener todos los controles de calidad
router.get('/', controlCalidadController.readControlCalidades);

// Obtener un control de calidad por ID
router.get('/:id', controlCalidadController.readControlCalidad);

// Actualizar un control de calidad
router.put('/:id', controlCalidadController.updateControlCalidad);

// Eliminar un control de calidad
router.delete('/:id', controlCalidadController.deleteControlCalidad);

module.exports = router;
