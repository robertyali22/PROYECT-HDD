const db = require('../models');
const Soldador = db.Soldador;

// Crear un nuevo soldador
exports.createSoldador = async (req, res) => {
  try {
    const soldador = await Soldador.create(req.body);
    res.status(201).json(soldador);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear soldador', error });
  }
};

// Obtener todos los soldadores
exports.readSoldadores = async (req, res) => {
  try {
    const soldadores = await Soldador.findAll();
    res.json(soldadores);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener soldadores', error });
  }
};

// Obtener soldador por ID
exports.readSoldador = async (req, res) => {
  try {
    const soldador = await Soldador.findByPk(req.params.id);
    if (soldador) {
      res.json(soldador);
    } else {
      res.status(404).json({ mensaje: 'Soldador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener soldador', error });
  }
};

// Actualizar un soldador
exports.updateSoldador = async (req, res) => {
  try {
    const soldador = await Soldador.findByPk(req.params.id);
    if (soldador) {
      await soldador.update(req.body);
      res.json({ mensaje: 'Soldador actualizado', soldador });
    } else {
      res.status(404).json({ mensaje: 'Soldador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar soldador', error });
  }
};

// Eliminar un soldador
exports.deleteSoldador = async (req, res) => {
  try {
    const soldador = await Soldador.findByPk(req.params.id);
    if (soldador) {
      await soldador.destroy();
      res.json({ mensaje: 'Soldador eliminado' });
    } else {
      res.status(404).json({ mensaje: 'Soldador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar soldador', error });
  }
};
