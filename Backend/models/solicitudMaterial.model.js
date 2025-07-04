module.exports = (sequelize, DataTypes) => {
  const SolicitudMaterial = sequelize.define("SolicitudMaterial", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuarioId: {
      type: DataTypes.INTEGER
    },
    materialId: {
      type: DataTypes.INTEGER
    },
    cantidad: {
      type: DataTypes.INTEGER
    },
    fechaSolicitud: {
      type: DataTypes.DATE
    },
    estado: {
      type: DataTypes.STRING
    },
    justificacion: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'solicitudes_material',
    timestamps: false
  });

  return SolicitudMaterial;
};
