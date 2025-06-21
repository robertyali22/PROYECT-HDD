const db = require('../models');
const Dashboard = db.Dashboard;

// Crear un nuevo dashboard
exports.createDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.create(req.body);
    res.status(201).json(dashboard);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear dashboard', error });
  }
};

// Obtener todos los dashboards
exports.readDashboards = async (req, res) => {
  try {
    const dashboards = await Dashboard.findAll();
    res.json(dashboards);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener dashboards', error });
  }
};

// Obtener dashboard por ID
exports.readDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findByPk(req.params.id);
    if (dashboard) {
      res.json(dashboard);
    } else {
      res.status(404).json({ mensaje: 'Dashboard no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener dashboard', error });
  }
};

// Actualizar dashboard
exports.updateDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findByPk(req.params.id);
    if (dashboard) {
      await dashboard.update(req.body);
      res.json({ mensaje: 'Dashboard actualizado', dashboard });
    } else {
      res.status(404).json({ mensaje: 'Dashboard no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar dashboard', error });
  }
};

// Eliminar dashboard
exports.deleteDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findByPk(req.params.id);
    if (dashboard) {
      await dashboard.destroy();
      res.json({ mensaje: 'Dashboard eliminado' });
    } else {
      res.status(404).json({ mensaje: 'Dashboard no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar dashboard', error });
  }
};
