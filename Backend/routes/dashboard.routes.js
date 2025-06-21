const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

// Crear nuevo dashboard
router.post('/', dashboardController.crearDashboard);

// Obtener todos los dashboards
router.get('/', dashboardController.obtenerDashboards);

// Obtener un dashboard por ID
router.get('/:id', dashboardController.obtenerDashboardPorId);

// Actualizar un dashboard
router.put('/:id', dashboardController.actualizarDashboard);

// Eliminar un dashboard
router.delete('/:id', dashboardController.eliminarDashboard);

module.exports = router;
