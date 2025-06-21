const express = require('express');
const router = express.Router();
const solicitudMaterialController = require('../controllers/solicitudMaterial.controller');

// Crear nueva solicitud
router.post('/', solicitudMaterialController.createSolicitudMaterial);

// Obtener todas las solicitudes
router.get('/', solicitudMaterialController.readSolicitudesMaterial);

// Obtener solicitud por ID
router.get('/:id', solicitudMaterialController.readSolicitudMaterial);

// Actualizar solicitud
router.put('/:id', solicitudMaterialController.updateSolicitudMaterial);

// Eliminar solicitud
router.delete('/:id', solicitudMaterialController.deleteSolicitudMaterial);

module.exports = router;
