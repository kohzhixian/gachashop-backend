const express = require("express");
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/users-routes');
const genreRoutes = require('./Routes/genre-routes');
const HttpError = require('./modals/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', genreRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find route', 404);
    throw error;
})

app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknow error occurred!'});
})

app.listen(4000, () => {
    console.log("server starting at port 4000")
})
