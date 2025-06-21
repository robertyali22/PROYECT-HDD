const db = require('../models');
const Soldadura = db.Soldadura;

// Crear una nueva soldadura
exports.crearSoldadura = async (req, res) => {
  try {
    const soldadura = await Soldadura.create(req.body);
    res.status(201).json(soldadura);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear soldadura', error });
  }
};

// Obtener todas las soldaduras
exports.obtenerSoldaduras = async (req, res) => {
  try {
    const soldaduras = await Soldadura.findAll();
    res.json(soldaduras);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener soldaduras', error });
  }
};

// Obtener soldadura por ID
exports.obtenerSoldaduraPorId = async (req, res) => {
  try {
    const soldadura = await Soldadura.findByPk(req.params.id);
    if (soldadura) {
      res.json(soldadura);
    } else {
      res.status(404).json({ mensaje: 'Soldadura no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener soldadura', error });
  }
};

// Actualizar una soldadura
exports.actualizarSoldadura = async (req, res) => {
  try {
    const soldadura = await Soldadura.findByPk(req.params.id);
    if (soldadura) {
      await soldadura.update(req.body);
      res.json({ mensaje: 'Soldadura actualizada', soldadura });
    } else {
      res.status(404).json({ mensaje: 'Soldadura no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar soldadura', error });
  }
};

// Eliminar una soldadura
exports.eliminarSoldadura = async (req, res) => {
  try {
    const soldadura = await Soldadura.findByPk(req.params.id);
    if (soldadura) {
      await soldadura.destroy();
      res.json({ mensaje: 'Soldadura eliminada' });
    } else {
      res.status(404).json({ mensaje: 'Soldadura no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar soldadura', error });
  }
};
