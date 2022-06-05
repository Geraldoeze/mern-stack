const DUMMY_USERS = [
    {
        id: 'u1',
        name: ' Gerald Eze',
        email: 'test2@test.com',
        password: '111111test'
    }
]
const HttpError = require('../models/http-error');

exports.getUsers = (req, res, next) => {
   
    res.status(200).json({users: DUMMY_USERS})
};

exports.createNewUser = (req, res, next) => {

};

exports.loginUser = (req, res, next) => {

};