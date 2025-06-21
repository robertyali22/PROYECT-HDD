const express = require('express');
const router = express.Router();
const controlCalidadController = require('../controllers/controlCalidad.controller');

// Crear nuevo control de calidad
router.post('/', controlCalidadController.crearControlCalidad);

// Obtener todos los controles de calidad
router.get('/', controlCalidadController.obtenerControlCalidades);

// Obtener un control de calidad por ID
router.get('/:id', controlCalidadController.obtenerControlCalidadPorId);

// Actualizar un control de calidad
router.put('/:id', controlCalidadController.actualizarControlCalidad);

// Eliminar un control de calidad
router.delete('/:id', controlCalidadController.eliminarControlCalidad);

module.exports = router;
