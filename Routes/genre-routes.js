const express = require('express');
const router = express.Router();

const DUMMY_GENRES = [
    {
        id: 'g1',
        genre: 'Action',
        games: {
            id: 'game1',
            game_name: 'epic seven',
            image_url: '/Images/Action_epicseven.jpg',
            price: 10
        }
    }
]

router.get('/genre/:genre', (req, res, next) => {
    const genreId = req.params.genre;
    const genre = DUMMY_GENRES.find(g => {
        return g.id === genreId;
    })

    res.json({genre});
})

module.exports = router;