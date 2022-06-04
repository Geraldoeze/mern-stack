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

router.get('/:uid', (req, res, next) => {
    const userId = req.params.uid;
    const user = DUMMY_PLACES.find(u => {
        return u.creator === userId
    })
    res.json({user})
})

module.exports = router;