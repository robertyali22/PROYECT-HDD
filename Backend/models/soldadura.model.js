module.exports = (sequelize, DataTypes) => {
  const Soldadura = sequelize.define("Soldadura", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    soldadorId: DataTypes.INTEGER,
    proyectoId: DataTypes.INTEGER,
    materialId: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fechaCreacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    estado: DataTypes.STRING,
    imagenes: DataTypes.STRING
  });

  return Soldadura;
};