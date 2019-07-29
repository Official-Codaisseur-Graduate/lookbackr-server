const Sequelize = require('sequelize')
const db = require('../db')

const Card = db.define(
    'card',
    { 
      text: {
        type: Sequelize.TEXT,
        field: 'text',
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        field: 'type',
        allowNull: false
      }
    }, {
        timestamps: false,
        tableName: 'cards'
    }
)

module.exports = Card;