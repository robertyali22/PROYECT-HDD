module.exports = (sequelize, DataTypes) => {
  const Tarea = sequelize.define("Tarea", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    proyectoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    prioridad: {
      type: DataTypes.STRING
    },
    fechaAsignacion: {
      type: DataTypes.DATE
    },
    fechaVencimiento: {
      type: DataTypes.DATE
    },
    estado: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'tareas',
    timestamps: false
  });

  return Tarea;
};
