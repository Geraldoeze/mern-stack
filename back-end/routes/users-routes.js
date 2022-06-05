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

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId
    })
    if(!place) {
        const error = new Error('No User found');
        error.code = 404;
        throw error;
      } 
      
    res.json({place})
})

module.exports = router;