require('dotenv').config()

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const { sequelize } = require('../server/models');
const {SERVER_PORT} = process.env
const Leaderboard = require('../server/models/Puzzler');
const Puzzler = require('../server/models/Leaderboard');
const {seed} = require('./database/db')
const {
  getPuzzler,
  createPuzzler,
  updatePuzzler,
  deletePuzzler,
  getTopFivePuzzlers,
  getAllPuzzlers,
  searchPuzzlers,
} = require("./controller/controller.js");


app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "jigsaw-puzzle", "public")));

app.post('/models', seed);

app.get('/puzzlers', getAllPuzzlers);
app.get('/leaderboard', getTopFivePuzzlers);
app.get('/puzzlers/search', searchPuzzlers);


app.get('/puzzler/:user_id', getPuzzler);
app.post('/puzzlers', createPuzzler);
app.put('/puzzlers/:user_id', updatePuzzler);
app.delete('/puzzlers/:user_id', deletePuzzler);
app.post('/leaderboard', async (req, res) => {
  try {
    const leaderboardData = await Leaderboard.findAll({
      order: [["score", "DESC"]],
      include: "puzzler",
      limit: 5,
    });

    res.json(leaderboardData);
  } catch (error) {
    console.error("Error retrieving leaderboard data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving leaderboard data" });
  }
});

Puzzler.hasMany(Leaderboard, { foreignKey: "userId" });
Leaderboard.belongsTo(Puzzler, { foreignKey: "userId" });

sequelize
  .sync({ force: true }) // for developmental environment
  .then(() => {
    app.listen(SERVER_PORT, () =>
      console.log(`Database synced successfully. ${SERVER_PORT}`)
    );
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });


app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT}`));


