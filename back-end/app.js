const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-route');
const userRoutes = require('./routes/users-routes');

const app = express();
const HttpError = require('./models/http-error');


const URI = 'mongodb://127.0.0.1:27017/maps';


app.use(bodyParser.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);


//This handle routes that don't exist
app.use((req, res, next) => {
  const error = new HttpError('No Route found', 404);
  throw error;  
});

// Express recogmises and treat a 4 parameter function as special error middleware function
app.use((error, req, res, next) => { 
  if (res.headerSent) {
      return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred'});
});

app.listen(5000, ser=> {
    console.log("Connect", ser) 
})