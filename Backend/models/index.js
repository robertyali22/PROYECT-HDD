const dbConfig = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: dbConfig.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.Usuario = require('./usuario.model.js')(sequelize, DataTypes);
db.Soldador = require('./soldador.model.js')(sequelize, DataTypes);
db.Administrador = require('./administrador.model.js')(sequelize, DataTypes);
db.Soldadura = require('./soldadura.model.js')(sequelize, DataTypes);
db.ControlCalidad = require('./controlCalidad.model.js')(sequelize, DataTypes);
db.Proyecto = require('./proyecto.model.js')(sequelize, DataTypes);
db.Tarea = require('./tarea.model.js')(sequelize, DataTypes);
db.Material = require('./material.model.js')(sequelize, DataTypes);
db.SolicitudMaterial = require('./solicitudMaterial.model.js')(sequelize, DataTypes);
db.Auditoria = require('./auditoria.model.js')(sequelize, DataTypes);
db.Dashboard = require('./dashboard.model.js')(sequelize, DataTypes);

// Relaciones

// Usuario → Soldador y Administrador
db.Usuario.hasOne(db.Soldador, { foreignKey: 'usuarioId' });
db.Soldador.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });

db.Usuario.hasOne(db.Administrador, { foreignKey: 'usuarioId' });
db.Administrador.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });

// Soldador → Soldadura
db.Soldador.hasMany(db.Soldadura, { foreignKey: 'soldadorId' });
db.Soldadura.belongsTo(db.Soldador, { foreignKey: 'soldadorId' });

// Administrador → ControlCalidad
db.Administrador.hasMany(db.ControlCalidad, { foreignKey: 'administradorId' });
db.ControlCalidad.belongsTo(db.Administrador, { foreignKey: 'administradorId' });

// Soldadura → ControlCalidad
db.Soldadura.hasOne(db.ControlCalidad, { foreignKey: 'soldaduraId' });
db.ControlCalidad.belongsTo(db.Soldadura, { foreignKey: 'soldaduraId' });

// Proyecto → Tarea
db.Proyecto.hasMany(db.Tarea, { foreignKey: 'proyectoId' });
db.Tarea.belongsTo(db.Proyecto, { foreignKey: 'proyectoId' });

// Proyecto → Soldadura
db.Proyecto.hasMany(db.Soldadura, { foreignKey: 'proyectoId' });
db.Soldadura.belongsTo(db.Proyecto, { foreignKey: 'proyectoId' });

// Tarea → Soldadura
db.Tarea.hasMany(db.Soldadura, { foreignKey: 'tareaId' });
db.Soldadura.belongsTo(db.Tarea, { foreignKey: 'tareaId' });

// Soldador → Tarea
db.Soldador.hasMany(db.Tarea, { foreignKey: 'soldadorId' });
db.Tarea.belongsTo(db.Soldador, { foreignKey: 'soldadorId' });

// Material → SolicitudMaterial
db.Material.hasMany(db.SolicitudMaterial, { foreignKey: 'materialId' });
db.SolicitudMaterial.belongsTo(db.Material, { foreignKey: 'materialId' });

// Soldador → SolicitudMaterial
db.Soldador.hasMany(db.SolicitudMaterial, { foreignKey: 'soldadorId' });
db.SolicitudMaterial.belongsTo(db.Soldador, { foreignKey: 'soldadorId' });

// Administrador → Auditoria
db.Administrador.hasMany(db.Auditoria, { foreignKey: 'administradorId' });
db.Auditoria.belongsTo(db.Administrador, { foreignKey: 'administradorId' });

// Dashboard → Proyecto (relación muchos a muchos)
db.Dashboard.belongsToMany(db.Proyecto, {
  through: 'Dashboard_Proyecto',
  foreignKey: 'dashboardId',
  otherKey: 'proyectoId'
});
db.Proyecto.belongsToMany(db.Dashboard, {
  through: 'Dashboard_Proyecto',
  foreignKey: 'proyectoId',
  otherKey: 'dashboardId'
});

// Dashboard → Material (relación muchos a muchos)
db.Dashboard.belongsToMany(db.Material, {
  through: 'Dashboard_Material',
  foreignKey: 'dashboardId',
  otherKey: 'materialId'
});
db.Material.belongsToMany(db.Dashboard, {
  through: 'Dashboard_Material',
  foreignKey: 'materialId',
  otherKey: 'dashboardId'
});

module.exports = db;
