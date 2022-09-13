const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const path = require('path');

const placesRoutes = require('./routes/places-route');
const userRoutes = require('./routes/users-routes');

const app = express();
const HttpError = require('./models/http-error');


const MONGODB_URI = 
 `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mapcluster.oefbid7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// const MONGODB_URI = 'mongodb://127.0.0.1:27017/mern';


app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use( express.static(path.join('public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');  
  next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

//This handle routes that don't exist
// app.use((req, res, next) => {
//   const error = new HttpError('No Route found', 404);
//   throw error;  
// });

// Express recogmises and treat a 4 parameter function as special error middleware function
app.use((error, req, res, next) => { 
  if(req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
      return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred'});
});

mongoose
  .connect(MONGODB_URI)
  .then( () => {
    app.listen(process.env.PORT || 5002);
    console.log("Connected!!")
  })
  .catch(err => {
    console.log(err)
  });
