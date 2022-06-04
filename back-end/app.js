const express = require('express');
const bodyParser = require('body-parser')

const placesRoutes = require('./routes/places-route');
const userRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);


app.listen(5000, ser=> {
    console.log("Connect", ser) 
})