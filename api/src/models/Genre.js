const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genre', {
        name: {
            type: DataTypes.STRING
        } //No genero un ID porque no voy a agregar más generos a mi DB
    }, 
    {
      timestamp: false
    })
} 