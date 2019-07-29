const Sequelize = require('sequelize')
const db = require('../db')
const User = require('../user/model')
const Card = require('../card/model')

const Retro = db.define(
    'retro',
    {
      name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            field: 'description',
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull:false
        },
        done: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false,
        tableName: 'retros'
    }
)

Retro.hasMany(Card);
Retro.hasMany(User);

module.exports = Retro;