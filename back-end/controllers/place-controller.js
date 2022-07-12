const uuid = require('uuid');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const getCoordinateAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');    
const  mongoose  = require('mongoose');


const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));


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
    res.json({place: place.toObject( {getters: true})}); // getters makes sure that mongoose add an id to whatever is created and it removes the underscore in the id created
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
   
    // let places;
    let userWithPlaces;
    try {
        userWithPlaces = await User.findById(userId).populate('places');
    } catch (err) {
        const error = new HttpError(
            'Fetching places failed, please try again later.', 500
        );
        return next(error);
    }

    // if (!places || places.length)
    if(!userWithPlaces || userWithPlaces.length === 0) {
        throw new HttpError('No User found in the Database', 404);
      } 
      
    res.json({ places: userWithPlaces.places.map(place => place.toObject( {getters: true})) })
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
        return next(error); 
    }
   
    const createdPlace = new Place({
        title: title,
        description: description,
        address: address,
        location: coordinates,
        image: "lion.jpg",
        creator: creator
    });

    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        const error = new HttpError('Creating place failed.', 500)
        return next(error);
    }
    if (!user) {
        const error = new HttpError('Could not find user with that id', 500)
        return(error);
    }
    console.log(createdPlace);

    
    
    try {
        const sess = await conn.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess })
        user.places.push(createdPlace);
        await user.save({ session: sess })
        await sess.commitTransaction();
       
        
    } catch (err) {
        const error = new HttpError(
            'Creating place failing, please try again', 
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
        return next( new HttpError('Invalid Inputs', 422));
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

exports.deletePlace = async (req, res, next) => {
    const placeId = req.params.placeid;

    let place;
    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (err) {
        const error = new HttpError('Could not delete place', 500);
        return next(error);
    }

    if (!place) {
        const error = new HttpError('Could not find place for this id.', 404);
        return next(error);
    }

 
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({session: sess});
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Could not delete place', 500);
        return next(error);
    }

  res.status(200).json({message: 'Deleted Place'}) 
};


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace;