const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/users-routes");
const genreRoutes = require("./Routes/genre-routes");
const orderRoutes = require("./Routes/orders-routes");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
// prevent CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");                    
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});



app.use("/api/users", userRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error occurred!" });
});

//establish connection to databse
mongoose
  .set("strictQuery", true)
  .connect(
    "mongodb+srv://everlastboy:P%40ssw0rd@cluster0.hlulv8p.mongodb.net/gachashop?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("server starting at port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
