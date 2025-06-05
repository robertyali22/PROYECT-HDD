module.exports = (sequelize, DataTypes) => {
  const Administrador = sequelize.define("Administrador", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
    departamento: DataTypes.STRING,
    telefono: DataTypes.STRING
  });

  return Administrador;
};