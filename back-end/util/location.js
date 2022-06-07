const axios = require('axios');
const HttpError = require('../models/http-error'); 

const API_KEY = 'AIzaSyAPsGQDU62F3gf9snkaSp42j0A23QSvxKM';

async function getCoordinateAddress(address) {
    // return {
    //     lat: 35.434222,
    //     lng: -25.554332
    // };
  const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
    );

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError('Could not find location for the specified address.', 422)
        throw error;
    }
    console.log(data)
    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

module.exports = getCoordinateAddress;