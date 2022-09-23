const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const MINE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

// const fileUpload = multer({
//     limits: 500000,
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, 'uploads/images');
//         },
//         filename: (req, file, cb) => {
//             const ext = MINE_TYPE_MAP[file.mimetype];
//             cb(null, uuidv4() + '.' + ext);
//         }
//     }),
//     fileFilter: (req, file, cb) => {
//         const isValid = !!MINE_TYPE_MAP[file.mimetype];
//         let error = isValid ? null : new Error("Invalid minetype")
//         cb(error, isValid);
//     }
// });


const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            cb(null,  file.originalname);
        } 
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }     
})
module.exports = fileUpload;