const db = require('../models');
const CategoriaMaterial = db.CategoriaMaterial;

// Crear una nueva categoría de material
exports.createCategoriaMaterial = async (req, res) => {
  try {
    const categoria = await CategoriaMaterial.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear categoría de material', error });
  }
};

// Obtener todas las categorías
exports.readCategoriasMaterial = async (req, res) => {
  try {
    const categorias = await CategoriaMaterial.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener categorías', error });
  }
};

// Obtener categoría por ID
exports.readCategoriaMaterial = async (req, res) => {
  try {
    const categoria = await CategoriaMaterial.findByPk(req.params.id);
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener categoría', error });
  }
};

// Actualizar una categoría
exports.updateCategoriaMaterial = async (req, res) => {
  try {
    const categoria = await CategoriaMaterial.findByPk(req.params.id);
    if (categoria) {
      await categoria.update(req.body);
      res.json({ mensaje: 'Categoría actualizada', categoria });
    } else {
      res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar categoría', error });
  }
};

// Eliminar una categoría
exports.deleteCategoriaMaterial = async (req, res) => {
  try {
    const categoria = await CategoriaMaterial.findByPk(req.params.id);
    if (categoria) {
      await categoria.destroy();
      res.json({ mensaje: 'Categoría eliminada' });
    } else {
      res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar categoría', error });
  }
};
