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
let SyncMySQL = require('../models/SyncDatabase');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../videos'));
    }
})

var upload = multer({ storage: storage })
let db = new Database();
/* upload video */
router.post('/upload/video', upload.single('video'), function (req, res, next) {
    let duration = 0;
    let qr = new SyncMySQL();
    let video_id = qr.query(`SELECT AUTO_INCREMENT AS max_id
            FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'assignment' 
            AND TABLE_NAME = 'video'`)[0].max_id;
    fs.rename( './../videos/' + req.file.filename, './../videos/' + video_id + '.mp4', () => {
        var videoPath = path.resolve('./../videos/',  video_id + '.mp4');
        var proc = ffmpeg(videoPath).takeScreenshots({
            count: 1,
            timemarks: ['00:00:1.000'],
            filename: video_id + '.png',
            size: '600x400',
            folder: "./public/images/thumbnails/"
        }).on('codecData', (data) => {
            let duration = data.duration.toString();
            db.query(`SELECT TIME_TO_SEC('${duration}') AS duration`).then(rows => {
                db.query(`INSERT INTO video(id, upload_account, length) VALUES ('${video_id}', '${req.body.username}', ${rows[0].duration})`);
            })
        });
        setTimeout(() => {
            res.json({
                imageUrl: video_id + '.png',
                id: video_id
            });
        }, 5000);
    });
});

router.put('/video/:id', (req, res) => {
    console.log(req.body);
    db.query(`UPDATE video 
    SET status=${req.body.state}, name='${req.body.name}', description='${req.body.desc}', tags='${req.body.tag}' 
    WHERE id=${req.body.id}`).then((rows) => res.end());
});

/* delete video */
router.delete('/video/:id', (req, res) => {
    db.query('DELETE FROM video WHERE id=' + req.params.id);
    fs.unlink('./../videos/' + req.params.id + '.mp4', (err) => {
        if (err) throw err;
        fs.unlink('./public/images/thumbnails/' + req.params.id + '.png', (err) => {
            if (err)
                throw err;
            res.json({ success: true });
        })
    });
});

module.exports = router;