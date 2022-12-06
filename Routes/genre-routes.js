const express = require('express');
const genreController = require('../controllers/genre-controller');

const router = express.Router();


router.get('/:genre', genreController.getGamesByGenre);
router.post('/addgame', genreController.addGameToGenre);
router.patch('/updategame/:gameId', genreController.updateGames);
router.delete('/deletegame/:gameId', genreController.deleteGames);

module.exports = router;