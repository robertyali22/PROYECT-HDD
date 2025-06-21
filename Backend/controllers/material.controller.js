const db = require('../models');
const Material = db.Material;

// Crear un nuevo material
exports.createMaterial = async (req, res) => {
  try {
    const material = await Material.create(req.body);
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear material', error });
  }
};

// Obtener todos los materiales
exports.readMateriales = async (req, res) => {
  try {
    const materiales = await Material.findAll();
    res.json(materiales);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener materiales', error });
  }
};

// Obtener material por ID
exports.readMaterial = async (req, res) => {
  try {
    const material = await Material.findByPk(req.params.id);
    if (material) {
      res.json(material);
    } else {
      res.status(404).json({ mensaje: 'Material no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener material', error });
  }
};

// Actualizar un material
exports.updateMaterial = async (req, res) => {
  try {
    const material = await Material.findByPk(req.params.id);
    if (material) {
      await material.update(req.body);
      res.json({ mensaje: 'Material actualizado', material });
    } else {
      res.status(404).json({ mensaje: 'Material no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar material', error });
  }
};

// Eliminar un material
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByPk(req.params.id);
    if (material) {
      await material.destroy();
      res.json({ mensaje: 'Material eliminado' });
    } else {
      res.status(404).json({ mensaje: 'Material no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar material', error });
  }
};
