const HttpError = require("../models/http-error");
const Games = require("../models/games");
const { validationResult } = require("express-validator");

const showAllGames = async (req, res, next) => {
  let games;
  try {
    games = await Games.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching games failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ games: games });
};

const getGamesByGenre = async (req, res, next) => {
  const genreType = req.params.genre;
  let genre;
  try {
    genre = await Games.find({ genre: genreType });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a genre.",
      500
    );
    return next(error);
  }

  if (!genre) {
    const error = new HttpError(
      "Could not find any games for the provided genre",
      404
    );
    return next(error);
  }
  res.json({ games: genre });
};

const addGameToGenre = async (req, res, next) => {
  const { genre, game_name, image_url, price } = req.body;
  const createdGame = new Games({
    game_name,
    genre,
    image_url,
    price,
  });
  try {
    await createdGame.save();
  } catch (err) {
    const error = new HttpError("Created place failed,please try again.", 500);
    return next(error);
  }
  res.status(201).json({ game: createdGame });
};

const updateGames = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inpputs passed, please check your data.", 422);
  }

  const { price } = req.body;
  const gameId = req.params.gameId;

  let game;
  try {
    game = await Games.findById(gameId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not update game",
      500
    );
    return next(error);
  }
  game.price = price;
  try {
    await game.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ game: game });
};

const deleteGames = async (req, res, next) => {
  const gameId = req.params.gameId;
  let game;
  try {
    game = await Games.findById(gameId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete game",
      500
    );
    return next(error);
  }

  try {
    await game.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete game",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Game deleted" });
};

exports.showAllGames = showAllGames;
exports.getGamesByGenre = getGamesByGenre;
exports.addGameToGenre = addGameToGenre;
exports.updateGames = updateGames;
exports.deleteGames = deleteGames;
