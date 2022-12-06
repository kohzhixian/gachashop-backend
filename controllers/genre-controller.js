const HttpError = require("../modals/http-error");
const { v4: uuid } = require("uuid");

const DUMMY_GENRES = [
  {
    gid: "g1",
    genre: "Action",
    games: [
      {
        id: "game1",
        game_name: "epic seven",
        image_url: "/Images/Action_epicseven.jpg",
        price: 10,
      },
    ],
  },
  {
    gid: "g2",
    genre: "Adventure",
    games: [
      {
        id: "game2",
        game_name: "botworld adventure",
        image_url: "/Images/Adventure_botworldadventure.jpg",
        price: 20,
      },
    ]
  }
];

const getGamesByGenre = (req, res, next) => {
  const genreType = req.params.genre;
  const genre = DUMMY_GENRES.filter(g => g.genre === genreType);
  res.json({games: genre});
}

const addGameToGenre = (req, res, next) => {
  const {genre, games} = req.body;

  const genreType = DUMMY_GENRES.find(g => g.genre === genre);
  genreType.games.push(games);
  res.status(201).json({message: 'Game Added'});
}

const updateGames = (req, res, next) => {
  const {price} = req.body;
  const gameId = req.params.gameId;

  DUMMY_GENRES.forEach((genre,idx) => {
    const gameIdx = genre.games.findIndex(game => game.id === gameId);
    if(gameIdx >= 0){
      DUMMY_GENRES[idx].games[gameIdx].price = price;
    }
  })
  res.status(200).json({message: "game updated"});

}

const deleteGames = (req, res, next) => {
  const gameId = req.params.gameId;
  DUMMY_GENRES.forEach((genre, idx) => {
    DUMMY_GENRES[idx].games = genre.games.filter(game => game.id !== gameId);
  })
  res.status(200).json({message: "Game deleted"});
}

exports.getGamesByGenre = getGamesByGenre;
exports.addGameToGenre = addGameToGenre;
exports.updateGames = updateGames;
exports.deleteGames = deleteGames;
