const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tarea.controller');

// Crear nueva tarea
router.post('/', tareaController.createTarea);

// Obtener todas las tareas
router.get('/', tareaController.readTareas);

// Obtener una tarea por ID
router.get('/:id', tareaController.readTarea);

// Actualizar una tarea
router.put('/:id', tareaController.updateTarea);

// Eliminar una tarea
router.delete('/:id', tareaController.deleteTarea);

module.exports = router;
