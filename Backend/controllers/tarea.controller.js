const db = require('../models');
const Tarea = db.Tarea;

// Crear una nueva tarea
exports.crearTarea = async (req, res) => {
  try {
    const tarea = await Tarea.create(req.body);
    res.status(201).json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear tarea', error });
  }
};

// Obtener todas las tareas
exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tareas', error });
  }
};

// Obtener tarea por ID
exports.obtenerTareaPorId = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (tarea) {
      res.json(tarea);
    } else {
      res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tarea', error });
  }
};

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (tarea) {
      await tarea.update(req.body);
      res.json({ mensaje: 'Tarea actualizada', tarea });
    } else {
      res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar tarea', error });
  }
};

// Eliminar una tarea
exports.eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (tarea) {
      await tarea.destroy();
      res.json({ mensaje: 'Tarea eliminada' });
    } else {
      res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar tarea', error });
  }
};
