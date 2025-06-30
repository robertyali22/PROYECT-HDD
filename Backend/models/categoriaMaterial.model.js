module.exports = (sequelize, DataTypes) => {
  const CategoriaMaterial = sequelize.define("CategoriaMaterial", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'categorias_material',
    timestamps: false
  });

  return CategoriaMaterial;
};
