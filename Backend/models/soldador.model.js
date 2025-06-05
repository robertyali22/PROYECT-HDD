module.exports = (sequelize, DataTypes) => {
  const Soldador = sequelize.define("Soldador", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
    certificaciones: DataTypes.STRING,
    especialidad: DataTypes.STRING,
    nivelExperiencia: DataTypes.INTEGER
  });

  return Soldador;
};