const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID, //Selecciono yo mi ID para que no se pise con el de la API
      defaultValue: DataTypes.UUIDV4, //Le doy un valor por defecto de UUID
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.DATEONLY
    },
    rating: {
      type: DataTypes.DECIMAL,
      validate: {
        isNumeric: true,
        min: 1,
        max: 5,
      },
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      default: true
    }, //Para diferenciar de los que creamos con base de dato
    image: {
      type: DataTypes.TEXT
    }
  }, 
  {
    timestamp: false
  });
};
