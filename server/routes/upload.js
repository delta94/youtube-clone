var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var pathToSave = path.resolve(__dirname, '../../videos');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathToSave);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

router.post('/video', upload.single('video'), (req, res, next) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.end();
});

router.post('/image', upload.single('image'), (req, res, next) => {

});

module.exports = router;