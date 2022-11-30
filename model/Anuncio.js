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
        validate: {
            notEmpty: {
                msg: 'O campo titulo é obrigatório!'
            },
            len:{
                args: [3,100],
                msg: "O campo titulo deve ter entre 5 e 100 caracteres"
            } 
        }
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo titulo é obrigatório!'
            }
        }
    },
    preco:{
        type: Sequelize.DOUBLE, 
        allowNull: false
    }
}, { sequelize, modelName: 'anuncio', tableName: 'anuncios' });

Anuncio.belongsTo(Usuario);

module.exports = Anuncio;