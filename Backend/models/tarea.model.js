module.exports = (sequelize, DataTypes) => {
  const Tarea = sequelize.define("Tarea", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    proyectoId: DataTypes.INTEGER,
    soldadorId: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    prioridad: DataTypes.STRING,
    fechaAsignacion: DataTypes.DATE,
    fechaVencimiento: DataTypes.DATE,
    estado: DataTypes.STRING
  });

  return Tarea;
};