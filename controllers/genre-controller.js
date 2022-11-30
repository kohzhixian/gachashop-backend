const HttpError = require("../modals/http-error");
const { v4: uuid } = require("uuid");

const DUMMY_GENRES = [
  {
    gid: "g1",
    genre: "Action",
    games: {
      id: "game1",
      game_name: "epic seven",
      image_url: "/Images/Action_epicseven.jpg",
      price: 10,
    },
  },
];

const getGenreById = (req, res, next) => {
  const genreId = req.params.genre;
  const genre = DUMMY_GENRES.find((g) => {
    return g.gid === genreId;
  });

  if (!genre) {
    return next(new HttpError("Could not find any data for genre id", 404));
  }
  res.json({ genre });
};

const createGenre = (req, res, next) => {
  const { gid, genre, gameDetails } = req.body;
  const createGenre = {
    id: uuid(),
    gid,
    genre,
    games: gameDetails,
  };

  DUMMY_GENRES.push(createGenre);
  res.status(201).json({ genre: createGenre });
};

exports.getGenreById = getGenreById;
exports.createGenre = createGenre;
