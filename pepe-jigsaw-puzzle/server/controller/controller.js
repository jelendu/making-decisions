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

const express = require("express");
const router = express.Router();
const Leaderboard = require('../models/Puzzler');
const Puzzler = require("../models/Leaderboard");


router.get("/", (req, res, next) => {
  Puzzler.findAll({
    include: [
      {
        model: Leaderboard,
        as: "leaderboardEntries",
      },
    ],
  })
    .then((puzzlers) => res.json(puzzlers))
    .catch(next);
});

module.exports = router;

module.exports = {
  getAllPuzzlers: async (req, res) => {
    try {
      const puzzlers = await sequelize.query('SELECT * FROM "Puzzlers"', {
        model: Puzzler,
        mapToModel: true,
      });
      res.status(200).send(puzzlers);
    } catch (error) {
      console.log("ERROR IN getAllPuzzlers");
      console.log(error);
      res.sendStatus(400);
    }
  },

  getTopFivePuzzlers: async (req, res) => {
    try {
      const topFivePuzzlers = await sequelize.query(
        `SELECT "Puzzler"."id", "Puzzler"."name", "Puzzler"."username", "Leaderboard"."score", "Leaderboard"."time_taken" FROM "Puzzlers" AS "Puzzler"
        INNER JOIN "Leaderboards" AS "Leaderboard" ON "Puzzler"."id" = "Leaderboard"."puzzlerId"
        ORDER BY "Leaderboard"."score" DESC
        LIMIT 5;`,
        {
          model: Puzzler,
          mapToModel: true,
        }
      );
      res.status(200).send(topFivePuzzlers);
    } catch (error) {
      console.log("ERROR IN getTopFivePuzzlers");
      console.log(error);
      res.sendStatus(400);
    }
  },

  searchPuzzlers: async (req, res) => {
    try {
      const searchString = req.query.q.toLowerCase();
      const puzzlers = await sequelize.query(
        `SELECT * FROM "Puzzlers" WHERE LOWER("name") LIKE '%${searchString}%'`,
        {
          model: Puzzler,
          mapToModel: true,
        }
      );
      res.status(200).send(puzzlers);
    } catch (error) {
      console.log("ERROR IN searchPuzzlers");
      console.log(error);
      res.sendStatus(400);
    }
  },

  createPuzzler: async (req, res) => {
    try {
      const { name, username } = req.body;
      await sequelize.query(
        `INSERT INTO "Puzzlers" ("name", "username") VALUES ('${name}', '${username}')`
      );
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN createPuzzler");
      console.log(error);
      res.sendStatus(400);
    }
  },

  getPuzzler: async (req, res) => {
    try {
      const { puzzlerId } = req.params;
      const puzzler = await sequelize.query(
        `SELECT * FROM "Puzzlers" WHERE "id" = ${puzzlerId}`,
        {
          model: Puzzler,
          mapToModel: true,
        }
      );
      res.status(200).send(puzzler[0]);
    } catch (error) {
      console.log("ERROR IN getPuzzler");
      console.log(error);
      res.sendStatus(400);
    }
  },

  updatePuzzler: async (req, res) => {
    try {
      const { id, name, username } = req.body;
      await sequelize.query(
        `UPDATE "Puzzlers" SET "name" = '${name}', "username" = '${username}' WHERE "id" = ${id}`
      );
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN updatePuzzler");
      console.log(error);
      res.sendStatus(400);
    }
  },

  deletePuzzler: async (req, res) => {
    try {
      const { id } = req.params;
      await sequelize.query(`DELETE FROM "Puzzlers" WHERE "id" = ${id}`);
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN deletePuzzler");
      console.log(error);
      res.sendStatus(400);
    }
  },
};
