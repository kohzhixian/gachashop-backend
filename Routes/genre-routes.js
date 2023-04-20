const express = require('express');
const genreController = require('../controllers/genre-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);

router.get('/', genreController.showAllGames);
router.get('/:genre', genreController.getGamesByGenre);



router.post('/addgame', genreController.addGameToGenre);
router.patch('/updategame/:gameId', genreController.updateGames);
router.delete('/deletegame/:gameId', genreController.deleteGames);

module.exports = router;