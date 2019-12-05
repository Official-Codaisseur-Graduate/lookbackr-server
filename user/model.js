const Sequelize = require("sequelize");
const db = require("../db");
const Card = require("../card/model");

const User = db.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      field: "user_username",
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    done: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: false,
    tableName: "users"
  }
);

User.hasMany(Card);
module.exports = User;
