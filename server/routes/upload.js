var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();
var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffprobePath = require('@ffprobe-installer/ffprobe').path;
var ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
var fs = require('fs');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../videos'));
    },
    filename: function (req, file, cb) {
        /* TODO: replace req.file.filename with the index of uploaded video in database */
        cb(null, file.fieldname + '-' + Date.now() + '.mp4');
    }
})

var upload = multer({ storage: storage })

router.post('/video', upload.single('video'), function (req, res, next) {


    var videoPath = path.resolve('./../videos', req.file.filename);
    var proc = ffmpeg(videoPath).takeScreenshots({ count: 1, timemarks: ['00:00:1.000'], filename: req.file.filename + '.png', size: '300x200', folder: "./public/images/" });
    setTimeout(() => {
        console.log(req.file.filename + '.png')
        res.send(req.file.filename + '.png');
    }, 5000);

});

module.exports = router;