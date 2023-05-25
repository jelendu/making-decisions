require("dotenv").config();

const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

// defining the Puzzler model for my database where each entry will have an id as the primary key, name & username

const { DataTypes } = require("sequelize");

const Puzzler = sequelize.define("puzzler", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  player: DataTypes.STRING,
  username: DataTypes.STRING,
});

module.exports = Puzzler;
