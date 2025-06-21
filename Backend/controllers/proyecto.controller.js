const db = require('../models');
const Proyecto = db.Proyecto;

// Crear un nuevo proyecto
exports.crearProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.create(req.body);
    res.status(201).json(proyecto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear proyecto', error });
  }
};

// Obtener todos los proyectos
exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proyectos', error });
  }
};

// Obtener proyecto por ID
exports.obtenerProyectoPorId = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (proyecto) {
      res.json(proyecto);
    } else {
      res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proyecto', error });
  }
};

// Actualizar un proyecto
exports.actualizarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (proyecto) {
      await proyecto.update(req.body);
      res.json({ mensaje: 'Proyecto actualizado', proyecto });
    } else {
      res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar proyecto', error });
  }
};

// Eliminar un proyecto
exports.eliminarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (proyecto) {
      await proyecto.destroy();
      res.json({ mensaje: 'Proyecto eliminado' });
    } else {
      res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar proyecto', error });
  }
};
