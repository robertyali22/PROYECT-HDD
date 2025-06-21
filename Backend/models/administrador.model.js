module.exports = (sequelize, DataTypes) => {
  const Administrador = sequelize.define("Administrador", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departamento: {
      type: DataTypes.STRING
    },
    telefono: {
      type: DataTypes.STRING
    }
  });

  return Administrador;
};