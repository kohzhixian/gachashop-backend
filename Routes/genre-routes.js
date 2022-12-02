const express = require('express');
const genreController = require('../controllers/genre-controller');

const router = express.Router();


router.get('/:genre', genreController.getGenreById);
router.post('/createdGenre', genreController.createGenre);
router.patch('/:genre', genreController.updateGenre);

module.exports = router;