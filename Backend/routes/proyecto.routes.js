const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyecto.controller');

// Crear nuevo proyecto
router.post('/', proyectoController.crearProyecto);

// Obtener todos los proyectos
router.get('/', proyectoController.obtenerProyectos);

// Obtener un proyecto por ID
router.get('/:id', proyectoController.obtenerProyectoPorId);

// Actualizar un proyecto
router.put('/:id', proyectoController.actualizarProyecto);

// Eliminar un proyecto
router.delete('/:id', proyectoController.eliminarProyecto);

module.exports = router;
