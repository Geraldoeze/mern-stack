const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const path = require('path');

const placesRoutes = require('./routes/places-route');
const userRoutes = require('./routes/users-routes');

const app = express();
const HttpError = require('./models/http-error');


// const MONGODB_URI = 
//  `mongodb+srv://geraldoeze:Wnaxx5M7fs2KX8q5@mapcluster.oefbid7.mongodb.net/location?retryWrites=true&w=majority`;

const MONGODB_URI = 'mongodb://127.0.0.1:27017/mern';


app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

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


//This handle routes that don't exist
app.use((req, res, next) => {
  const error = new HttpError('No Route found', 404);
  throw error;  
});

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
    app.listen(5000);
    console.log("Connected!!")
  })
  .catch(err => {
    console.log(err)
  });
