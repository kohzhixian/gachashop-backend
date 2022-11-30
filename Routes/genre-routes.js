const express = require('express');
const genreController = require('../controllers/genre-controller');

const router = express.Router();


router.get('/genre/:genre', genreController.getGenreById);
router.post('/createdGenre', genreController.createGenre);

module.exports = router;