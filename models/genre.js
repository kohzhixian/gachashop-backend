const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const genreSchema = new Schema({
    genre: {type: String, required: true},
    games: [
        {
            game_name: {type: String, required: true},
            image_url: {type: String, required: true},
            price: {type: Number, required: true}
        }
    ]
});

module.exports = mongoose.model('Genre', genreSchema);