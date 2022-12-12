const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const placesRoutes = require("./routes/places-route");
const userRoutes = require("./routes/users-routes");
const cors = require("cors");

const HttpError = require("./models/http-error");
const { default: helmet } = require("helmet");

const app = express();

app.use(bodyParser.json());

// const MONGODB_URI = 'mongodb://127.0.0.1:27017/mern';
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mapcluster.oefbid7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// app.use(multer({limits: fileLimit, storage: fileStorage, fileFilter: fileFilter}).single('image'))
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(helmet());
app.use(cors());

// app.use((req, res, next) => {
//     //CORS error handler
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'DELETE', 'PATCH', 'POST', 'GET');
//   next();
//   })
 
app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

// app.post('api/users/signup', (req, res) => {
//     // console.log(req.file)
//     console.log(req.file)
//   })

//This handle routes that don't exist
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

// Express recogmises and treat a 4 parameter function as special error middleware function
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT || 5200);
    console.log("Connected!!");
  })
  .catch((err) => {
    console.log(err);
  });