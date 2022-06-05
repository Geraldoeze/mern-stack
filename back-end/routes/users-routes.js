const express = require('express');

const router = express.Router();
const userController = require('../controllers/user-controller')

router.get('/', userController.getUsers);

router.post('/signup', userController.createNewUser);

router.post('/login', userController.loginUser);


module.exports = router