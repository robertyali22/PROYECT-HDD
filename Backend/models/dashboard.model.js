module.exports = (sequelize, DataTypes) => {
  const Dashboard = sequelize.define("Dashboard", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.STRING
    },
    configuracion: {
      type: DataTypes.TEXT
    },
    ultimaActualizacion: {
      type: DataTypes.DATE
    }
  });

  return Dashboard;
};
