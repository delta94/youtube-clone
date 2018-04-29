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

let id = Math.round((Math.random() * 100));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../videos'));
    },
    filename: function (req, file, cb) {
        /* TODO: replace req.file.filename with the index of uploaded video in database */
        cb(null, id.toString() + '.mp4');
    }
})

var upload = multer({ storage: storage })

/* upload video */
router.post('/upload/video', upload.single('video'), function (req, res, next) {
    var videoPath = path.resolve('./../videos', req.file.filename);
    let filename = (req.file.filename.split('.')[0]);
    console.log(filename);
    var proc = ffmpeg(videoPath).takeScreenshots({ count: 1, timemarks: ['00:00:1.000'], filename: filename + '.png', size: '300x200', folder: "./public/images/" });
    setTimeout(() => {
        res.json({
            imageUrl: filename + '.png',
            id: id
        });
    }, 5000);

});

/* delete video */
router.delete('/video/:id', (req, res) => {
    fs.unlink('./../videos/' + req.params.id + '.mp4', (err) => {
        console.log(path.resolve('./../videos', req.params.id + '.mp4'));
        if (err) throw err;
        fs.unlink('./public/images/' + req.params.id + '.png', (err) => {
            console.log(path.resolve('./public/images', req.params.id + '.png'));
            if (err)
                throw err;
            res.json({ success: true });
        })
    }); 
});

module.exports = router;