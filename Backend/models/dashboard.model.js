module.exports = (sequelize, DataTypes) => {
  const Dashboard = sequelize.define("Dashboard", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tipo: DataTypes.STRING,
    configuracion: DataTypes.STRING,
    ultimaActualizacion: DataTypes.DATE
  });

  return Dashboard;
};