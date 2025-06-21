const express = require('express');
const router = express.Router();
const soldaduraController = require('../controllers/soldadura.controller');

// Crear nueva soldadura
router.post('/', soldaduraController.crearSoldadura);

// Obtener todas las soldaduras
router.get('/', soldaduraController.obtenerSoldaduras);

// Obtener una soldadura por ID
router.get('/:id', soldaduraController.obtenerSoldaduraPorId);

// Actualizar una soldadura
router.put('/:id', soldaduraController.actualizarSoldadura);

// Eliminar una soldadura
router.delete('/:id', soldaduraController.eliminarSoldadura);

module.exports = router;
