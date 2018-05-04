let express = require('express');
let multer = require('multer');
let path = require('path');
let router = express.Router();
let ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
let ffprobePath = require('@ffprobe-installer/ffprobe').path;
let ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
let fs = require('fs');
let Database = require('../models/Database');
let MySql = require('sync-mysql');
const config = require('../config/mysqlConfig');
let SyncMySQL = require('../models/SyncDatabase');


let qr = new SyncMySQL();
let video_id = qr.query('SELECT MAX(id) + 1 AS max_id FROM video')[0].max_id || 0;
console.log('max_id: ', video_id);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../videos'));
    },
    filename: function (req, file, cb) {
        /* TODO: replace req.file.filename with the index of uploaded video in database */
        cb(null, video_id.toString() + '.mp4');
    }
})

let upload = multer({ storage: storage })

/* upload video */
router.post('/video', upload.single('video'), function (req, res, next) {
    let duration = 0;
    let videoPath = path.resolve('./../videos', req.file.filename);
    let filename = (req.file.filename.split('.')[0]);
    let proc = ffmpeg(videoPath).takeScreenshots({
        count: 1,
        timemarks: ['00:00:1.000'],
        filename: filename + '.png',
        size: '600x400',
        folder: "./public/images/"
    }).on('codecData', (data) => {
        let duration = data.duration.toString();
        console.log(duration);
        let db = new Database();
        db.query(`SELECT TIME_TO_SEC('${duration}') AS duration`).then(rows => {
            console.log(rows[0].duration);
            db.query(`INSERT INTO video(id, upload_account, length) VALUES ('${video_id}', '${req.body.username}', ${rows[0].duration})`);
        })
    });
    setTimeout(() => {
        res.json({
            imageUrl: filename + '.png',
            id: filename
        });
    }, 5000);

});

module.exports = router;