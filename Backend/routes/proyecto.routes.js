const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyecto.controller');

// Crear nuevo proyecto
router.post('/', proyectoController.createProyecto);

// Obtener todos los proyectos
router.get('/', proyectoController.readProyectos);

// Obtener un proyecto por ID
router.get('/:id', proyectoController.readProyecto);

// Actualizar un proyecto
router.put('/:id', proyectoController.updateProyecto);

// Eliminar un proyecto
router.delete('/:id', proyectoController.deleteProyecto);

module.exports = router;
