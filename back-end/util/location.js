const axios = require('axios');
const HttpError = require('../models/http-error'); 

const API_KEY = 'AIzaSyBiphie6iQJYWNKIwUKlQmN4j8NvXybalQ';

async function getCoordinateAddress(address) {
    // return {
    //     lat: 35.434222,
    //     lng: -25.554332
    // };
  const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
    );

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError('Could not find location for the specified address.', 422)
        throw error;
    }
    console.log(data.result)
    const coordinates = data.result[0].geometry.location;

    return coordinates;
}

module.exports = getCoordinateAddress;