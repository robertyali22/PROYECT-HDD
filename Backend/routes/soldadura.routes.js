const express = require('express');
const router = express.Router();
const soldaduraController = require('../controllers/soldadura.controller');

// Crear nueva soldadura
router.post('/', soldaduraController.createSoldadura);

// Obtener todas las soldaduras
router.get('/', soldaduraController.readSoldaduras);

// Obtener una soldadura por ID
router.get('/:id', soldaduraController.readSoldadura);

// Actualizar una soldadura
router.put('/:id', soldaduraController.updateSoldadura);

// Eliminar una soldadura
router.delete('/:id', soldaduraController.deleteSoldadura);

module.exports = router;
