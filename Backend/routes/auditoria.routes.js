const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/auditoria.controller');

// Crear nueva auditoría
router.post('/', auditoriaController.crearAuditoria);

// Obtener todas las auditorías
router.get('/', auditoriaController.obtenerAuditorias);

// Obtener una auditoría por ID
router.get('/:id', auditoriaController.obtenerAuditoriaPorId);

// Actualizar auditoría
router.put('/:id', auditoriaController.actualizarAuditoria);

// Eliminar auditoría
router.delete('/:id', auditoriaController.eliminarAuditoria);

module.exports = router;
