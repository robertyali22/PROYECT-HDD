module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    // Opcionales según el tipo de usuario
    certificaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nivelExperiencia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    departamento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zonaSupervision: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'usuarios',
    timestamps: false
  });

  return Usuario;
};
