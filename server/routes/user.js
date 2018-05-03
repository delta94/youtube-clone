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
var Database = require('../models/Database');
var MySql = require('sync-mysql');
const config = require('../config/mysqlConfig');
var SyncMySQL = require('../models/SyncDatabase');


let qr = new SyncMySQL();
let video_id = qr.query('SELECT MAX(id) + 1 AS max_id FROM video')[0].max_id || 0;
console.log('max_id: ', video_id);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../videos'));
    },
    filename: function (req, file, cb) {
        /* TODO: replace req.file.filename with the index of uploaded video in database */
        cb(null, video_id.toString() + '.mp4');
    }
})

var upload = multer({ storage: storage })

/* upload video */
router.post('/upload/video', upload.single('video'), function (req, res, next) {
    let duration = 0;
    var videoPath = path.resolve('./../videos', req.file.filename);
    let filename = (req.file.filename.split('.')[0]);
    var proc = ffmpeg(videoPath).takeScreenshots({
        count: 1,
        timemarks: ['00:00:1.000'],
        filename: filename + '.png',
        size: '600x400',
        folder: "./public/images/"
    }).on('codecData', (data) => {
        let duration = data.duration.toString();
        console.log(duration);
        var db = new Database();
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

router.put('/video/:id', (req, res) => {
    let db = new Database();
    console.log('inside');
    console.log(req.body);
    db.query(`UPDATE video 
    SET status=${req.body.state}, name='${req.body.name}', description='${req.body.desc}', tag='${req.body.tag}' 
    WHERE id=${req.body.id}`).then((rows) => res.end());
});

/* delete video */
router.delete('/video/:id', (req, res) => {
    let db = new Database();
    db.query('DELETE FROM video WHERE id=' + req.params.id);
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