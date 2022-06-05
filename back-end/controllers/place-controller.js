const uuid = require('uuid');

const HttpError = require('../models/http-error');
const {DUMMY_PLACES} = require('../models/dummy')
// const DUMMY_PLACES = [
//     {
//         id: 'p12',
//         title: 'Twin Tower Naija',
//         description: 'The tallest building in Abuja',
//         location: {
//             lat: 20.446634,
//             lng: 50.444356
//         },
//         address: '15 W 20th St, FCT Abuja Near ChurchGate',
//         creator: 'u1'
//     }
//     ];
    
const getPlaceById = (req, res, next) => {
    const placeId = req.params.placeid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    })
    if(!place) {
      return next(
          new HttpError('NO place found', 404)
      );
    } 
    res.json({place: place});
};


const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId
    })
    
    if(!place) {
        throw new HttpError('No place found', 404);
        
      } 
      
    res.json({place})
}

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body; 
    const createdPlace = {
        id: uuid.v4(),
        title: title,
        description: description,
        location: coordinates,
        address: address,
        creator: creator
    };
    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({place: createdPlace})
}

exports.updatePlace = (req, res, next) => {
    const { title, description } = req.body; 
    const placeId = req.params.placeid;

    const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)}; 
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)
    updatedPlace.title = title;
    updatedPlace.description = description

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace})
};

exports.deletePlace = (req, res, next) => {

};


exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId
exports.createPlace = createPlace;