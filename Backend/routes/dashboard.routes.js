const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

// Crear nuevo dashboard
router.post('/', dashboardController.createDashboard);

// Obtener todos los dashboards
router.get('/', dashboardController.readDashboards);

// Obtener un dashboard por ID
router.get('/:id', dashboardController.readDashboard);

// Actualizar un dashboard
router.put('/:id', dashboardController.updateDashboard);

// Eliminar un dashboard
router.delete('/:id', dashboardController.deleteDashboard);

module.exports = router;
