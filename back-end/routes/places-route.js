const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
{
    id: 'p12',
    title: 'Twin Tower Naija',
    description: 'The tallest building in Abuja',
    location: {
        lat: 20.446634,
        lng: 50.444356
    },
    address: '15 W 20th St, FCT Abuja Near ChurchGate',
    creator: 'u1'
}
];

router.get('/:placeid', (req, res, next) => {
  const placeId = req.params.placeid;
  const place = DUMMY_PLACES.find(p => {
      return p.id === placeId
  })
  res.json({place: place});
});



module.exports = router; 