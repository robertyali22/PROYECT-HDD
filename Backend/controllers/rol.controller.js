const db = require('../models');
const Rol = db.Rol;

// Crear un nuevo rol
exports.createRol = async (req, res) => {
  try {
    const rol = await Rol.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion || ''
    });
    res.status(201).json(rol);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear rol', error });
  }
};

// Obtener todos los roles
exports.readRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener roles', error });
  }
};

// Obtener un rol por ID
exports.readRol = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (rol) {
      res.json(rol);
    } else {
      res.status(404).json({ mensaje: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener rol', error });
  }
};

// Actualizar un rol
exports.updateRol = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (rol) {
      await rol.update(req.body);
      res.json({ mensaje: 'Rol actualizado', rol });
    } else {
      res.status(404).json({ mensaje: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar rol', error });
  }
};

// Eliminar un rol
exports.deleteRol = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (rol) {
      await rol.destroy();
      res.json({ mensaje: 'Rol eliminado' });
    } else {
      res.status(404).json({ mensaje: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar rol', error });
  }
};
