module.exports = (sequelize, DataTypes) => {
  const ControlCalidad = sequelize.define("ControlCalidad", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    soldaduraId: DataTypes.INTEGER,
    administradorId: DataTypes.INTEGER,
    resultado: DataTypes.STRING,
    observaciones: DataTypes.STRING,
    fechaInspeccion: DataTypes.DATE,
    aprobado: DataTypes.BOOLEAN
  });

  return ControlCalidad;
};