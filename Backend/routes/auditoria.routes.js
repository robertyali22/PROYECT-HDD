const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/auditoria.controller');

// Crear nueva auditoría
router.post('/', auditoriaController.createAuditoria);

// Obtener todas las auditorías
router.get('/', auditoriaController.readAuditorias);

// Obtener una auditoría por ID
router.get('/:id', auditoriaController.readAuditoria);

// Actualizar auditoría
router.put('/:id', auditoriaController.updateAuditoria);

// Eliminar auditoría
router.delete('/:id', auditoriaController.deleteAuditoria);

module.exports = router;
