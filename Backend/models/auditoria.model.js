module.exports = (sequelize, DataTypes) => {
  const Auditoria = sequelize.define("Auditoria", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    administradorId: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fechaAuditoria: DataTypes.DATE,
    resultado: DataTypes.STRING,
    acciones: DataTypes.STRING
  });

  return Auditoria;
};