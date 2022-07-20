
const uuid = require('uuid');
const HttpError = require('../models/http-error');

const User = require('../models/user');
const { validationResult } = require('express-validator');



exports.getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password'); //-password makes sure we dont add it when using find()
  } catch (err) {
    console.log(err)
    const error = new HttpError('Fetching Users failed, please try again later', 500)
      return next(error)
  }
  
  res.json({users: users.map(user => user.toObject({ getters: true})) });
};

exports.createNewUser = async (req, res, next) => {
  
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return next( new HttpError('Invalid Inputs indeed', 422) );
    }
  const { name, email, password } = req.body;
  
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError('Signing Up Failed', 500)
    return next(error);
  };

  if (existingUser) {
    const error = new HttpError(
      'User already exists. Kindly login instead.', 422);
      return next(error);
  }
  const createdUser = new User({
    name: name,
    email: email,
    image: "goat.jpg",
    password: password,
    places: []
   });

   try {
    await createdUser.save();
} catch (err) {
    const error = new HttpError(
        'Signing up failed, please try again', 
        500
    );
    return next(error);
}

  res.status(201).json({user: createdUser.toObject({ getters: true})}); //getters remove the underscore in mongdb id
};

exports.loginUser = async (req, res, next) => {
  
  const { email, password } = req.body;
  
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError('Logging In Failed', 500)
    return next(error);
  };

  if(!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid Credentials.',
      401
    )
    return next(error)
  };

  res.status(200).json({message: 'LOGIN', 
      user: existingUser.toObject({getters: true})})
};

