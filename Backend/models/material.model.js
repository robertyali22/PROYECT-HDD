module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define("Material", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING
    },
    codigo: {
      type: DataTypes.STRING
    },
    tipo: {
      type: DataTypes.STRING
    },
    cantidad: {
      type: DataTypes.INTEGER
    },
    unidadMedida: {
      type: DataTypes.STRING
    },
    precioUnitario: {
      type: DataTypes.FLOAT
    },
    ubicacion: {
      type: DataTypes.STRING
    }
  });

  return Material;
};
