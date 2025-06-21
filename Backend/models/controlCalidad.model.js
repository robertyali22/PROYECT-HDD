module.exports = (sequelize, DataTypes) => {
  const ControlCalidad = sequelize.define("ControlCalidad", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    soldaduraId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    administradorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    resultado: {
      type: DataTypes.STRING
    },
    observaciones: {
      type: DataTypes.TEXT
    },
    fechaInspeccion: {
      type: DataTypes.DATE
    },
    aprobado: {
      type: DataTypes.BOOLEAN
    }
  });

  return ControlCalidad;
};
