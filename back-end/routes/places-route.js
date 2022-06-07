const express = require('express');
const placesControllers = require('../controllers/place-controller');
const { check } = require('express-validator')

const router = express.Router();

router.get('/:placeid',placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId);

router.post('/',
  [
      check('title').not().isEmpty(),
      check('description').isLength({min: 5}),
      check('address').not().isEmpty() 
  ],
  placesControllers.createPlace);

router.patch('/:placeid',
  [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5})
  ],
 placesControllers.updatePlace)

router.delete('/:placeid', placesControllers.deletePlace)

module.exports = router; 