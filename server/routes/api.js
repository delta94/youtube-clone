let express = require('express');
let router = express.Router();
let User = require('../models/User');
let Database = require('../models/Database');

router.get('/current_user', (req, res) => {
    console.log('current_user', req.user);
    res.json(req.user);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/signup', (req, res) => {        
    console.log('asflskafj');
    User.findUserByUsername(req.body.username, (user) => {
        if (user) {
            return res.json({success: false, message: "username already exists"});
        } else {
            User.createUser({ username: req.body.username, password: req.body.password, name: req.body.username }, () => {
                return res.json({success: true});
            });
        }
    });

});

router.get('/video/:id', (req, res) => {
    let snippet = {};
    let localized = {};
    let statistics = {};
    let db = new Database();
    let publishedAt = 0;
    db.query(`SELECT upload_account, name, description, published_dtime, tag FROM video WHERE id=${req.params.id}`)
        .then((rows) => {
            snippet["channelTitle"] = rows[0].upload_account;
            localized["title"] = rows[0].name;
            snippet["title"] = rows[0].name;
            localized["description"] = rows[0].description;
            snippet["localized"] = localized;
            snippet["publishedAt"] = rows[0].published_dtime;
            snippet["tags"] = rows[0].tag.split(',');
            return db.query(`SELECT name, description FROM account WHERE username='${rows[0].upload_account}'`);
        }).then((rows) => {
            snippet["channelTitle"] = rows[0].name;
            snippet["description"] = rows[0].description;
            return db.query(`SELECT COUNT(video_id) AS count_view FROM a_views_v WHERE video_id=${req.params.id}`)
        }).then((rows) => {
            statistics["viewCount"] = rows[0].count_view;
            return db.query(`SELECT COUNT(video_id) AS count_like FROM a_likes_v WHERE video_id=${req.params.id} AND liked=1`);
        }).then((rows) => {
            statistics["likeCount"] = rows[0].count_like;
            return db.query(`SELECT COUNT(video_id) AS count_dislike FROM a_likes_v WHERE video_id=${req.params.id} AND liked=-1`);
        }).then((rows) => { 
            statistics["dislikeCount"] = rows[0].count_dislike;
            res.json({
                id: req.params.id,
                snippet,
                statistics,
            });
        });
});

router.get('/checkForSubscription/', (req, res) => {
    console.log('->username: ', req.user.username);
    console.log('->channel: ', req.query.channel);
    db.query(`SELECT Subscribes_CheckExist('${req.user.username}', '${req.query.channel}')`).then((rows) => {
        let key = Object.keys(rows[0]).toString();
        res.json({ result: rows[0][key] });
    })
});

module.exports = router;