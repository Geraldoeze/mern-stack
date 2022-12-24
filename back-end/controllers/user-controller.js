const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

const User = require("../models/user");
const { validationResult } = require("express-validator");

const bcrypt = require("bcrypt");

exports.getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password"); //-password makes sure we dont add it when using find()
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fetching Users failed, please try again later",
      500
    );
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

exports.createNewUser = async (req, res, next) => {
  
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(new HttpError("Invalid Inputs indeed", 422));
  // }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing Up Failed", 545);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User already exists. Kindly login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not create user, please try again", 540);
    return next(error);
  }

  const createdUser = new User({
    name: name,
    email: email,
    image: req.file.path,
    password: hashedPassword,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 545);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 550);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};



exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging In Failed", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Invalid Credentials.", 403);
    return next(error);
  }

  let isValidPass = false;
  try {
    isValidPass = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("Could not login, check password", 500);
    return next(error);
  }

  if (!isValidPass) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again", 500);
    return next(error);
  }

  res
    .status(200)
    .json({
      message: "LOGIN",
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    });
};
