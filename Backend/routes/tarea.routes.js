const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tarea.controller');

// Crear nueva tarea
router.post('/', tareaController.crearTarea);

// Obtener todas las tareas
router.get('/', tareaController.obtenerTareas);

// Obtener una tarea por ID
router.get('/:id', tareaController.obtenerTareaPorId);

// Actualizar una tarea
router.put('/:id', tareaController.actualizarTarea);

// Eliminar una tarea
router.delete('/:id', tareaController.eliminarTarea);

module.exports = router;
