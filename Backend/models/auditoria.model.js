module.exports = (sequelize, DataTypes) => {
  const Auditoria = sequelize.define("Auditoria", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    administradorId: {
      type: DataTypes.INTEGER
    },
    tipo: {
      type: DataTypes.STRING
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    fechaAuditoria: {
      type: DataTypes.DATE
    },
    resultado: {
      type: DataTypes.STRING
    },
    acciones: {
      type: DataTypes.TEXT
    }
  });

  return Auditoria;
};
