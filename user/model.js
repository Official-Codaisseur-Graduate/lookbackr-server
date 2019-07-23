const Sequelize = require('sequelize')
const db = require('../db')
const Card = require('../card/model')

const User = db.define(
    'user',
    {
        username: {
            type: Sequelize.STRING,
            field: 'user_username',
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'users'
    }
)

User.hasMany(Card);
module.exports = User;