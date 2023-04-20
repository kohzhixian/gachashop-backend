const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  game_name: { type: String, required: true },
  genre: { type: String, required: true },
  image_url: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Games", gameSchema);
