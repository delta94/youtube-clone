let express = require('express');
let multer = require('multer');
let path = require('path');
let router = express.Router();
let Database = require('../models/Database');



router.put('/video/:id', (req, res) => {
    let db = new Database();
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