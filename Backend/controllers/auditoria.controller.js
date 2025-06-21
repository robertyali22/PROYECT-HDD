const db = require('../models');
const Auditoria = db.Auditoria;

// Crear una nueva auditoría
exports.createAuditoria = async (req, res) => {
  try {
    const auditoria = await Auditoria.create(req.body);
    res.status(201).json(auditoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear auditoría', error });
  }
};

// Obtener todas las auditorías
exports.readAuditorias = async (req, res) => {
  try {
    const auditorias = await Auditoria.findAll();
    res.json(auditorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener auditorías', error });
  }
};

// Obtener una auditoría por ID
exports.readAuditoria = async (req, res) => {
  try {
    const auditoria = await Auditoria.findByPk(req.params.id);
    if (auditoria) {
      res.json(auditoria);
    } else {
      res.status(404).json({ mensaje: 'Auditoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener auditoría', error });
  }
};

// Actualizar una auditoría
exports.updateAuditoria = async (req, res) => {
  try {
    const auditoria = await Auditoria.findByPk(req.params.id);
    if (auditoria) {
      await auditoria.update(req.body);
      res.json({ mensaje: 'Auditoría actualizada', auditoria });
    } else {
      res.status(404).json({ mensaje: 'Auditoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar auditoría', error });
  }
};

// Eliminar una auditoría
exports.deleteAuditoria = async (req, res) => {
  try {
    const auditoria = await Auditoria.findByPk(req.params.id);
    if (auditoria) {
      await auditoria.destroy();
      res.json({ mensaje: 'Auditoría eliminada' });
    } else {
      res.status(404).json({ mensaje: 'Auditoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar auditoría', error });
  }
};
