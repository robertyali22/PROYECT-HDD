const db = require('../models');
const ControlCalidad = db.ControlCalidad;

// Crear una nueva inspección de control de calidad
exports.createControlCalidad = async (req, res) => {
  try {
    const control = await ControlCalidad.create(req.body);
    res.status(201).json(control);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear control de calidad', error });
  }
};

// Obtener todas las inspecciones
exports.readControlCalidades = async (req, res) => {
  try {
    const controles = await ControlCalidad.findAll();
    res.json(controles);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener controles de calidad', error });
  }
};

// Obtener inspección por ID
exports.readControlCalidad = async (req, res) => {
  try {
    const control = await ControlCalidad.findByPk(req.params.id);
    if (control) {
      res.json(control);
    } else {
      res.status(404).json({ mensaje: 'Control de calidad no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener control de calidad', error });
  }
};

// Actualizar una inspección
exports.updateControlCalidad = async (req, res) => {
  try {
    const control = await ControlCalidad.findByPk(req.params.id);
    if (control) {
      await control.update(req.body);
      res.json({ mensaje: 'Control de calidad actualizado', control });
    } else {
      res.status(404).json({ mensaje: 'Control de calidad no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar control de calidad', error });
  }
};

// Eliminar una inspección
exports.deleteControlCalidad = async (req, res) => {
  try {
    const control = await ControlCalidad.findByPk(req.params.id);
    if (control) {
      await control.destroy();
      res.json({ mensaje: 'Control de calidad eliminado' });
    } else {
      res.status(404).json({ mensaje: 'Control de calidad no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar control de calidad', error });
  }
};
