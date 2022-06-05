const express = require('express');
const bodyParser = require('body-parser')

const placesRoutes = require('./routes/places-route');
const userRoutes = require('./routes/users-routes');

const app = express();


app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);

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