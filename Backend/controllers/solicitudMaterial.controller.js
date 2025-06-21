const db = require('../models');
const SolicitudMaterial = db.SolicitudMaterial;

// Crear una nueva solicitud de material
exports.crearSolicitudMaterial = async (req, res) => {
  try {
    const solicitud = await SolicitudMaterial.create(req.body);
    res.status(201).json(solicitud);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear solicitud', error });
  }
};

// Obtener todas las solicitudes de material
exports.obtenerSolicitudesMaterial = async (req, res) => {
  try {
    const solicitudes = await SolicitudMaterial.findAll();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener solicitudes', error });
  }
};

// Obtener solicitud de material por ID
exports.obtenerSolicitudMaterialPorId = async (req, res) => {
  try {
    const solicitud = await SolicitudMaterial.findByPk(req.params.id);
    if (solicitud) {
      res.json(solicitud);
    } else {
      res.status(404).json({ mensaje: 'Solicitud no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener solicitud', error });
  }
};

// Actualizar una solicitud de material
exports.actualizarSolicitudMaterial = async (req, res) => {
  try {
    const solicitud = await SolicitudMaterial.findByPk(req.params.id);
    if (solicitud) {
      await solicitud.update(req.body);
      res.json({ mensaje: 'Solicitud actualizada', solicitud });
    } else {
      res.status(404).json({ mensaje: 'Solicitud no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar solicitud', error });
  }
};

// Eliminar una solicitud de material
exports.eliminarSolicitudMaterial = async (req, res) => {
  try {
    const solicitud = await SolicitudMaterial.findByPk(req.params.id);
    if (solicitud) {
      await solicitud.destroy();
      res.json({ mensaje: 'Solicitud eliminada' });
    } else {
      res.status(404).json({ mensaje: 'Solicitud no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar solicitud', error });
  }
};
