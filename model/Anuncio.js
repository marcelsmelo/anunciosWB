const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const Usuario = require('./Usuario');

const Anuncio = sequelize.define('anuncio', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false
  },
   preco:{
        type: Sequelize.DOUBLE, 
        allowNull: false,
        default: 0.0
    }
}, { sequelize, modelName: 'anuncio', tableName: 'anuncios' });

Anuncio.belongsTo(Usuario);

module.exports = Anuncio;