const HttpError = require("../models/http-error");
const { v4: uuid } = require("uuid");
const Genre = require("../models/genre");
const mongoose = require("mongoose");
const genre = require("../models/genre");

const getGamesByGenre = async (req, res, next) => {
  const genreType = req.params.genre;
  let genre;
  try {
    genre = await Genre.findOne({ genre: genreType });
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
  res.json({ games: genre.games });

};

const addGameToGenre = async (req, res, next) => {
  const { genre, games } = req.body;
  let genreType;
  try {
    genreType = await Genre.findOne({ genre: genre });
    if (!genreType) throw new HttpError("Genre does not exist", 404);
  } catch (err) {
    const error = new HttpError("Genre does not exist", 404);
    return next(error);
  }
  genreType.games.push(games);

  try {
    await genreType.save();
  } catch (err) {
    const error = new HttpError("Adding game failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ message: "Game added!" });
};

const updateGames = async (req, res, next) => {
  const { price } = req.body;
  const gameId = req.params.gameId;

  try {
    await Genre.updateMany(
      { "games._id": gameId },
      { $set: { "games.$.price": price } },
      { multi: true }
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update game.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "game updated" });
};

const deleteGames = async (req, res, next) => {
  const gameId = req.params.gameId;
  try{
    await Genre.updateMany(
      {},
      {$pull: {games:{_id: gameId}}}
    )
  }catch(err){
    const error = new HttpError(
      'Something went wrong, could not delete game', 500
    )
    return next(error);
  }

  res.status(200).json({ message: "Game deleted" });
};

exports.getGamesByGenre = getGamesByGenre;
exports.addGameToGenre = addGameToGenre;
exports.updateGames = updateGames;
exports.deleteGames = deleteGames;
