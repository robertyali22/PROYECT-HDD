const db = require('../models');
const Administrador = db.Administrador;

// Crear un nuevo administrador
exports.crearAdministrador = async (req, res) => {
  try {
    const administrador = await Administrador.create(req.body);
    res.status(201).json(administrador);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear administrador', error });
  }
};

// Obtener todos los administradores
exports.obtenerAdministradores = async (req, res) => {
  try {
    const administradores = await Administrador.findAll();
    res.json(administradores);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener administradores', error });
  }
};

// Obtener administrador por ID
exports.obtenerAdministradorPorId = async (req, res) => {
  try {
    const administrador = await Administrador.findByPk(req.params.id);
    if (administrador) {
      res.json(administrador);
    } else {
      res.status(404).json({ mensaje: 'Administrador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener administrador', error });
  }
};

// Actualizar un administrador
exports.actualizarAdministrador = async (req, res) => {
  try {
    const administrador = await Administrador.findByPk(req.params.id);
    if (administrador) {
      await administrador.update(req.body);
      res.json({ mensaje: 'Administrador actualizado', administrador });
    } else {
      res.status(404).json({ mensaje: 'Administrador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar administrador', error });
  }
};

// Eliminar un administrador
exports.eliminarAdministrador = async (req, res) => {
  try {
    const administrador = await Administrador.findByPk(req.params.id);
    if (administrador) {
      await administrador.destroy();
      res.json({ mensaje: 'Administrador eliminado' });
    } else {
      res.status(404).json({ mensaje: 'Administrador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar administrador', error });
  }
};
