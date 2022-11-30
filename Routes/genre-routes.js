const express = require('express');
const genreController = require('../controllers/genre-controller');

const router = express.Router();


router.get('/genre/:genre', genreController.getGenreById);

module.exports = router;