const uuid = require('uuid');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const getCoordinateAddress = require('../util/location');


let DUMMY_PLACES = [
    {
        id: 'p12',
        title: 'Twin Tower Naija',
        description: 'The tallest building in Abuja',
        location: {
            lat: 20.446634,
            lng: 50.444356
        },
        address: '15 W 20th St, FCT Abuja Near ChurchGate',
        creator: 'u1'
    }
    ];
    
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

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId
    })
    
    if(!places || places.length === 0) {
        throw new HttpError('No place found for this userId', 404);
        
      } 
      
    res.json({ places })
}

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        next( new HttpError('Invalid Inputs', 422));
    }
    const { title, description, address, creator } = req.body; 

    let coordinates;
    try {
        coordinates = await getCoordinateAddress(address)
    } catch (error) {
        return next(error); 
    }
   
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError('Invalid Inputs', 422);
    }

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
    const placeId = req.params.placeid;
    if (!DUMMY_PLACES.find(p=> p.id === placeId)) {
        throw new HttpError('Invalid Inputs', 422);    
    }

  DUMMY_PLACES = DUMMY_PLACES.filter(p => {
    return p.id !== placeId
  });
  res.status(200).json({message: 'Deleted Place'})
};


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace;