module.exports = (sequelize, DataTypes) => {
  const SolicitudMaterial = sequelize.define("SolicitudMaterial", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    soldadorId: DataTypes.INTEGER,
    materialId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    fechaSolicitud: DataTypes.DATE,
    estado: DataTypes.STRING,
    justificacion: DataTypes.STRING
  });

  return SolicitudMaterial;
};