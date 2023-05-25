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

module.exports = {
    seed: (req, res) => {
        sequelize.query(
          `INSERT INTO puzzlers (user_id, player, username)
VALUES 
       (1, 'Ben', 'benchpressbroad_10'), 
       (2, 'Aranvihn', 'the_yaegerist'),
       (3, 'Jeri', 'notspringer9'),
       (4, 'Lucky', 'phantastic4'),
       (5, 'Anwar', 'anwarWins'),
       (6, 'Oscar', 'one_punch_man'),
       (7, 'Melissa', 'issaStar'),
       (8, 'Elena', 'i_can_see_the_future'),
       (9, 'Mahad', 'me_at_hello'),
       (10, 'Hikmah', 'theWise'),
       (11, 'Hoyoung', 'hohoholee'),
       (12, 'Mitchell', 'nothing_tops_the_css_god'),
       (13, 'Katya', 'daretobeK'),
       (14, 'Ashley', 'friendship_is_magic'),
       (15, 'Joanna', 'floating_nodes'),
       (16, 'Dionte', 'he_doesnt_just_walk_he_climbs'),
       (17, 'Nasir', 'nasir'),
       (18, 'Marufa', 'marufa'),
       (19, 'Junior', 'junior'),
       (20, 'Drew', 'drew'),
       (21, 'Brenda', 'brenda'),
       (22, 'Abdirahman', 'abdirahman'),
       (23, 'Charneaka', 'charneaka'),
       (24, 'Motasem', 'motasem'),
       (25, 'Latisha', 'latisha'),
       (26, 'Omair', 'omair'),
       (27, 'Rola', 'rola'),
       (28, 'Elise', 'elise'),
       (29, 'Chase', 'chase'),
       (30, 'Hamza', 'hamza'),
       (31, 'Andrew', 'andrew'),
       (32, 'Lyonel', 'lyonel'),
       (33, 'Ayuub', 'ayuub');


    INSERT INTO Leaderboard (score, time_taken, user_id, temp_id)
VALUES 
    (3000, 120, 1, NULL),   -- Ben scored 3000 in 120 seconds
    (2800, 150, 2, NULL),   -- Aranvihn scored 2800 in 150 seconds
    (2700, 160, 3, NULL),   -- Jeri scored 2700 in 160 seconds
    (2600, 170, 4, NULL),   -- Lucky scored 2600 in 170 seconds
    (2500, 180, 5, NULL),   -- Anwar scored 2500 in 180 seconds
    (3200, 110, 6, NULL),   -- Oscar scored 3200 in 110 seconds
    (3300, 105, 7, NULL),   -- Melissa scored 3300 in 105 seconds
    (2000, 200, 8, NULL),   -- Elena scored 2000 in 200 seconds
    (2900, 140, 9, NULL),   -- Mahad scored 2900 in 140 seconds
    (3100, 115, 10, NULL),  -- Hikmah scored 3100 in 115 seconds
    (3150, 112, 11, NULL),  -- Hoyoung scored 3150 in 112 seconds
    (2850, 155, 12, NULL),  -- Mitchell scored 2850 in 155 seconds
    (2950, 145, 13, NULL),  -- Katya scored 2950 in 145 seconds
    (2750, 165, 14, NULL),  -- Ashley scored 2750 in 165 seconds
    (2650, 175, 15, NULL),  -- Joanna scored 2650 in 175 seconds
    (3250, 108, 16, NULL),  -- Dionte scored 3250 in 108 seconds
    (3350, 102, 17, NULL),  -- Nasir scored 3350 in 102 seconds
    (2050, 198, 18, NULL),  -- Marufa scored 2050 in 198 seconds
    (2950, 142, 19, NULL),  -- Junior scored 2950 in 142 seconds
    (3150, 117, 20, NULL),  -- Drew scored 3150 in 117 seconds
    (3200, 113, 21, NULL),  -- Brenda scored 3200 in 113 seconds
    (2900, 148, 22, NULL),  -- Abdirahman scored 2900 in 148 seconds
    (3050, 134, 23, NULL),  -- Charneaka scored 3050 in 134 seconds
    (2800, 153, 24, NULL),  -- Motasem scored 2800 in 153 seconds
    (2700, 163, 25, NULL),  -- Latisha scored 2700 in 163 seconds
    (3250, 109, 26, NULL),  -- Omair scored 3250 in 109 seconds
    (3350, 101, 27, NULL),  -- Rola scored 3350 in 101 seconds
    (2100, 192, 28, NULL),  -- Elise scored 2100 in 192 seconds
    (3000, 138, 29, NULL),  -- Chase scored 3000 in 138 seconds
    (3200, 116, 30, NULL),  -- Hamza scored 3200 in 116 seconds
    (3300, 107, 31, NULL),  -- Andrew scored 3300 in 107 seconds
    (2950, 141, 32, NULL),  -- Lyonel scored 2950 in 141 seconds
    (3100, 119, 33, NULL);  -- Ayuub scored 3100 in 119 seconds   
`
        ).then(() => {
            console.log('db seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding db', err))
    }
};

