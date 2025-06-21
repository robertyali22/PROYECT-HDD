module.exports = (sequelize, DataTypes) => {
  const Proyecto = sequelize.define("Proyecto", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    fechaInicio: {
      type: DataTypes.DATE
    },
    fechaFin: {
      type: DataTypes.DATE
    },
    estado: {
      type: DataTypes.STRING
    },
    cliente: {
      type: DataTypes.STRING
    }
  });

  return Proyecto;
};
