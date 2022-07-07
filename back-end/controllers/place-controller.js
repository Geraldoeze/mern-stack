const uuid = require('uuid');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const getCoordinateAddress = require('../util/location');
const Place = require('../models/place');
    
const getPlaceById = async (req, res, next) => {
    const placeId = req.params.placeid;
    
    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find place', 500
        );
        return next(error);
    }
    
    if(!place) {
      const error = new HttpError('NO place found', 404)
      
      return next(error);
    } 
    res.json({place: place.toObject( {getters: true})}); // getters makes sure that mongoose add an id to whatever is created
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
   
    let places;
    try {
        places = await Place.find({ creator: userId });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find User', 500
        );
        return next(error);
    }
    if(!places || places.length === 0) {
        throw new HttpError('No User found in the Database', 404);
      } 
      
    res.json({ places: places.map(place => place.toObject( {getters: true})) })
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
        coordinates = await getCoordinateAddress(address);
        console.log("Na here", coordinates)
    } catch (error) {
        return next(error); s
    }
   
    const createdPlace = new Place({
        title: title,
        description: description,
        address: address,
        location: coordinates,
        image: "lion.jpg",
        creator: creator
    });

    try {
        await createdPlace.save();
    } catch (err) {
        const error = new HttpError(
            'Creating place failed, please try again', 
            500
        );
        return next(error);
    }
    
    res.status(201).json({place: createdPlace})
}

exports.updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError('Invalid Inputs', 422);
    }

    const { title, description } = req.body; 
    const placeId = req.params.placeid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Somthing went wrong', 500 )
        return next(error)
    }
    
    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update place.', 500
        );
        return next(error);
    }
    

    res.status(200).json({place: place.toObject({ getters: true})})
};

exports.deletePlace = (req, res, next) => {
    const placeId = req.params.placeid;
    if (!DUMMY_PLACES.find(p=> p.id === placeId)) {
        throw new HttpError('Invalid Inputs', 422);    
    }

  DUMMY_PLACES = DUMMY_PLACES.filter(p => {
    return p.id !== placeId
  });
  res.status(200).json({message: 'Deleted Place'})  // getters makes sure that mongoose add an id to whatever is created
};


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace;