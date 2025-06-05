module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define("Material", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: DataTypes.STRING,
    codigo: DataTypes.STRING,
    tipo: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    unidadMedida: DataTypes.STRING,
    precioUnitario: DataTypes.FLOAT,
    ubicacion: DataTypes.STRING
  });

  return Material;
};