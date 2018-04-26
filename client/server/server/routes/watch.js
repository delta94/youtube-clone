const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


router.get('/:id', function (req, res, next) {
    const videoPath = path.resolve(__dirname, `../../videos/${req.params.id}`) + '.mp4';
    if (fs.existsSync(videoPath)) {
        console.log(req.header.range);
        console.log('exist');
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1

            const chunksize = (end - start) + 1
            const file = fs.createReadStream(videoPath, { start, end })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }

            res.writeHead(206, head)
            file.pipe(res)
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            return res.writeHead(200, head)
            fs.createReadStream(videoPath).pipe(res)
        }
    }    
    else next();
})

router.use((req, res) => {
    // TODO: HANDLE VIDEO NOT FOUND
    res.end();
})

module.exports = router;