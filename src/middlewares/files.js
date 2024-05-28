const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });

const deleteFile = (filePath, callback) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};


module.exports = { upload, deleteFile };
