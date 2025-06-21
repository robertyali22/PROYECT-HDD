const express = require('express');
const router = express.Router();
const solicitudMaterialController = require('../controllers/solicitudMaterial.controller');

// Crear nueva solicitud
router.post('/', solicitudMaterialController.crearSolicitudMaterial);

// Obtener todas las solicitudes
router.get('/', solicitudMaterialController.obtenerSolicitudesMaterial);

// Obtener solicitud por ID
router.get('/:id', solicitudMaterialController.obtenerSolicitudMaterialPorId);

// Actualizar solicitud
router.put('/:id', solicitudMaterialController.actualizarSolicitudMaterial);

// Eliminar solicitud
router.delete('/:id', solicitudMaterialController.eliminarSolicitudMaterial);

module.exports = router;
