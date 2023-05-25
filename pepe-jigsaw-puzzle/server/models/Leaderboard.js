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


// defines the Leaderboard model and is linked to the Puzzler table through the puzzler_id as the foreign key

const { DataTypes } = require("sequelize");

const Leaderboard = sequelize.define('Leaderboard', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    score: DataTypes.INTEGER,
    timetaken: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    tempId: DataTypes.STRING,
  });

  module.exports = Leaderboard;

