const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  game_name: { type: String, required: true },
  price: {type: Number, required: true},
  quantity: {type: Number, required: true},
  totalAmount: { type: Number, required: true },
  user: {type: ObjectId, required: true}
});

module.exports = mongoose.model("Orders", orderItemSchema);