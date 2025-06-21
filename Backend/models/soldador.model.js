module.exports = (sequelize, DataTypes) => {
  const Soldador = sequelize.define("Soldador", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    certificaciones: {
      type: DataTypes.STRING
    },
    especialidad: {
      type: DataTypes.STRING
    },
    nivelExperiencia: {
      type: DataTypes.INTEGER
    }
  });

  return Soldador;
};
