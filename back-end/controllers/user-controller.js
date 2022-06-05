
const UserById = (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId
    })
    if(!place) {
        throw new HttpError('No place found', 404);
        
      } 
      
    res.json({place})
}