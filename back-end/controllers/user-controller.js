
const uuid = require('uuid');
const HttpError = require('../models/http-error');

const User = require('../models/user');
const { validationResult } = require('express-validator');


exports.getUsers = (req, res, next) => {
  res.status(200).json({users: DUMMY_USERS})
};

exports.createNewUser = async (req, res, next) => {
  console.log(req.body)
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return next( new HttpError('Invalid Inputs indeed', 422) );
    }
  const { name, email, password, places } = req.body;
  
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
    places: places
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

exports.loginUser = (req, res, next) => {
  
  const { email, password } = req.body;
  const Userlogin = DUMMY_USERS.find(u => u.email === email);
  if (!Userlogin || Userlogin.password !== password) {
      throw new HttpError('Error while login', 401)
  }
  res.status(200).json({message: 'LOGIN'})
};

