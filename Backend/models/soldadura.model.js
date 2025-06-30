module.exports = (sequelize, DataTypes) => {
  const Soldadura = sequelize.define("Soldadura", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    proyectoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    materialId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    estado: {
      type: DataTypes.STRING
    },
    imagenes: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'soldaduras',
    timestamps: false
  });

  return Soldadura;
};

