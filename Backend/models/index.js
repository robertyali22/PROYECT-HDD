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
db.Rol = require('./rol.model.js')(sequelize, DataTypes);
db.Soldadura = require('./soldadura.model.js')(sequelize, DataTypes);
db.ControlCalidad = require('./controlCalidad.model.js')(sequelize, DataTypes);
db.Proyecto = require('./proyecto.model.js')(sequelize, DataTypes);
db.Tarea = require('./tarea.model.js')(sequelize, DataTypes);
db.CategoriaMaterial = require('./categoriaMaterial.model.js')(sequelize, DataTypes);
db.Material = require('./material.model.js')(sequelize, DataTypes);
db.SolicitudMaterial = require('./solicitudMaterial.model.js')(sequelize, DataTypes);
db.Auditoria = require('./auditoria.model.js')(sequelize, DataTypes);
db.Dashboard = require('./dashboard.model.js')(sequelize, DataTypes);

// Relaciones

// Usuario → Rol
db.Usuario.belongsTo(db.Rol, { foreignKey: 'rolId' });
db.Rol.hasMany(db.Usuario, { foreignKey: 'rolId' });

// Usuario (rol: Soldador) → Soldadura
db.Usuario.hasMany(db.Soldadura, { foreignKey: 'usuarioId' });
db.Soldadura.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });

// Usuario (rol: Inspector) → Control de Calidad
db.Usuario.hasMany(db.ControlCalidad, { foreignKey: 'usuarioId' });
db.ControlCalidad.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });

// Usuario (rol: Administrador) → Auditorías
db.Usuario.hasMany(db.Auditoria, { foreignKey: 'usuarioId' });
db.Auditoria.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });

// Usuario (rol: Soldador) → SolicitudMaterial
db.Usuario.hasMany(db.SolicitudMaterial, { foreignKey: 'usuarioId' });
db.SolicitudMaterial.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });

// Usuario (rol: Soldador) → Tarea
db.Usuario.hasMany(db.Tarea, { foreignKey: 'usuarioId' });
db.Tarea.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });

// Soldadura → Control de Calidad
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

// CategoriaMaterial → Materiales
db.CategoriaMaterial.hasMany(db.Material, { foreignKey: 'categoriaId' });
db.Material.belongsTo(db.CategoriaMaterial, { foreignKey: 'categoriaId' });

// Material → SolicitudMaterial
db.Material.hasMany(db.SolicitudMaterial, { foreignKey: 'materialId' });
db.SolicitudMaterial.belongsTo(db.Material, { foreignKey: 'materialId' });

// Dashboard → Proyecto (muchos a muchos)
db.Dashboard.belongsToMany(db.Proyecto, {
  through: 'Dashboard_Proyecto',
  foreignKey: 'dashboardId',
  otherKey: 'proyectoId',
});
db.Proyecto.belongsToMany(db.Dashboard, {
  through: 'Dashboard_Proyecto',
  foreignKey: 'proyectoId',
  otherKey: 'dashboardId',
});

// Dashboard → Material (muchos a muchos)
db.Dashboard.belongsToMany(db.Material, {
  through: 'Dashboard_Material',
  foreignKey: 'dashboardId',
  otherKey: 'materialId',
});
db.Material.belongsToMany(db.Dashboard, {
  through: 'Dashboard_Material',
  foreignKey: 'materialId',
  otherKey: 'dashboardId',
});

module.exports = db;