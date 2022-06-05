const express = require('express');
const placesControllers = require('../controllers/place-controller');

const router = express.Router();

router.get('/:placeid',placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlaceByUserId);

router.post('/', placesControllers.createPlace);

module.exports = router; 