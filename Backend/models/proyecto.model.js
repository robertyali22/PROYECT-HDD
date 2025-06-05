module.exports = (sequelize, DataTypes) => {
  const Proyecto = sequelize.define("Proyecto", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
    estado: DataTypes.STRING,
    cliente: DataTypes.STRING
  });

  return Proyecto;
};