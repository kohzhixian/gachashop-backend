const HttpError = require('../modals/http-error');

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

const getGenreById = (req, res, next) => {
    const genreId = req.params.genre;
    const genre = DUMMY_GENRES.find(g => {
        return g.id === genreId;
    })

    if(!genre){
        return next(new HttpError('Could not find any data for genre id', 404));
    }


    res.json({genre});
}

exports.getGenreById = getGenreById;
