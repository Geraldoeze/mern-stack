// const fs = require('fs');
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const path = require('path');
// const multer = require('multer');
// const placesRoutes = require('./routes/places-route');
// const userRoutes = require('./routes/users-routes');
// const cors = require('cors');
// const app = express();
// const HttpError = require('./models/http-error');


// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//       cb(null, `${Date.now()}--${file.originalname}`);
//   } 
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/png' ||
//       file.mimetype === 'image/jpg' ||
//       file.mimetype === 'image/jpeg'
//   ) {
//       cb(null, true);
//   } else {
//       cb(null, false);
//   }
// };

// // const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mapcluster.oefbid7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const MONGODB_URI = 'mongodb://127.0.0.1:27017/mern';

// app.use(bodyParser.json());
 
// app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads/images', express.static(path.join('uploads', 'images')));


// // app.use((req, res, next) => {
// //   //CORS error handler
// //   res.setHeader('Access-Control-Allow-Origin', '*', 'OPTIONS');
// //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT, OPTIONS');
// //   res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With', 'Content-Type, Authorization')
// //   next();
// // })

// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTION'],
//   allowedHeaders: [ 'Content-Type', 'Authorization']
// }))

// app.post('/', (req, res) => {
//   console.log(req.file)
//   res.send('Server is Running!')
// })


// app.use('/api/places', placesRoutes);
// app.use('/api/users', userRoutes);


// //  this is used when serving both front and back ends on the same server.
// // app.use((req, res, next) => {
// //   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// // });

// //This handle routes that don't exist 
// app.use((req, res, next) => {
//   const error = new HttpError('Could not find this route', 404);
//   throw error;   
// });

// // Express recogmises and treat a 4 parameter function as special error middleware function
// app.use((error, req, res, next) => { 
//   if(req.file) {
//     fs.unlink(req.file.path, (err) => {
//       console.log(err);
//     });
//   }
//   if (res.headerSent) {
//       return next(error);
//   }
//   res.status(error.code || 500);
//   res.json({message: error.message || 'An unknown error occurred'});
// });

// mongoose
//   .connect(MONGODB_URI,{useNewUrlParser: true})
//   .then( () => {
//     app.listen(process.env.PORT || 5002);
//     console.log("Connected!!")
//   })
//   .catch(err => {
//     console.log(err)
//   });
