const express = require("express");
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/users-routes');
const genreRoutes = require('./Routes/genre-routes');

const app = express();

app.use('/api', userRoutes);
app.use('/api', genreRoutes);

app.listen(4000, () => {
    console.log("server starting at port 4000")
})
