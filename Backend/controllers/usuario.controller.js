const db = require('../models');
const Usuario = db.Usuario;
const Soldador = db.Soldador;

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);

    if (req.body.rol === "soldador") {
      await db.Soldador.create({
        usuarioId: usuario.id,
        certificaciones: req.body.certificaciones || "",
        especialidad: "",
        nivelExperiencia: 0,
      });
    }

    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear usuario", error });
  }
};

// Obtener todos los usuarios
exports.readUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: db.Soldador }] 
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
};


// Obtener usuario por ID
exports.readUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error });
  }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      await usuario.update(req.body);
      res.json({ mensaje: 'Usuario actualizado', usuario });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      await usuario.destroy();
      res.json({ mensaje: 'Usuario eliminado' });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error });
  }
};
