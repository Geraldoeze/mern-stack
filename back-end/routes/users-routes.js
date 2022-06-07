const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const userController = require('../controllers/user-controller')

router.get('/', userController.getUsers);

router.post('/signup',
  [ 
    check('name').not().isEmpty(),    
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min: 6})
  ],
 userController.createNewUser);

router.post('/login',  userController.loginUser);


module.exports = router