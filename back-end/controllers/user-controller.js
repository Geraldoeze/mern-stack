const DUMMY_USERS = [
    {
        id: 'u1',
        name: ' Gerald Eze',
        email: 'test2@test.com',
        password: '111111test'
    }
];
const uuid = require('uuid');
const HttpError = require('../models/http-error');

exports.getUsers = (req, res, next) => {
  res.status(200).json({users: DUMMY_USERS})
};

exports.createNewUser = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser) {
      throw new HttpError('Error while signup, possibly email exist already', 422 )
  }

  const createdUser = {
      id: uuid.v4(),
      name,
      email,
      password 
    };
  DUMMY_USERS.push(createdUser);

  res.status(200).json({user: createdUser})
};

exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  const Userlogin = DUMMY_USERS.find(u => u.email === email);
  if (!Userlogin || Userlogin.password !== password) {
      throw new HttpError('Error while login', 401)
  }
  res.status(200).json({message: 'LOGIN'})
};

