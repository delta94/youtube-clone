var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Database = require('../models/Database');
let db = new Database();

router.get('/current_user', (req, res) => { // this line shows the result after deserializing user from cookie
    res.json(req.user);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/signup', (req, res) => {
    User.findUserByUsername(req.body.username, (user) => {
        if (user) {
            return res.json({ success: false, message: "username already exists" });
        } else {
            User.createUser({ username: req.body.username, password: req.body.password, name: req.body.username }, () => {
                return res.json({ success: true });
            });
        }
    });

});

router.get('/video/:id', (req, res) => {
    let snippet = {};
    let localized = {};
    let statistics = {};
    let publishedAt = 0;
    db.query(`SELECT upload_account, name, description, published_dtime, tags FROM video WHERE id=${req.params.id}`)
        .then((rows) => {
            snippet["channelTitle"] = rows[0].upload_account;
            localized["title"] = rows[0].name;
            snippet["title"] = rows[0].name;
            localized["description"] = rows[0].description;
            snippet["localized"] = localized;
            snippet["publishedAt"] = rows[0].published_dtime;
            snippet["tags"] = rows[0].tags || '';
            return db.query(`SELECT name, description FROM account WHERE username='${rows[0].upload_account}'`);
        }).then((rows) => {
            snippet["channelTitle"] = rows[0].name;
            snippet["description"] = rows[0].description;
            return db.query(`SELECT COUNT(video_id) AS view_count FROM a_views_v WHERE video_id=${req.params.id}`)
        }).then((rows) => {
            statistics["viewCount"] = rows[0].view_count;
            return db.query(`SELECT COUNT(video_id) AS like_count FROM a_likes_v WHERE video_id=${req.params.id} AND liked=1`);
        }).then((rows) => {
            statistics["likeCount"] = rows[0].like_count;
            return db.query(`SELECT COUNT(video_id) AS dislike_count FROM a_likes_v WHERE video_id=${req.params.id} AND liked=-1`);
        }).then((rows) => {
            statistics["dislikeCount"] = rows[0].dislike_count;
            res.json({
                id: req.params.id,
                snippet,
                statistics,
            });
        });
});

router.get('/checkForSubscriptions/:chnl', (req, res) => {
    db.query(`SELECT Subscribes_CheckExist('${req.params.chnl}', '${req.user.username}')`)
        .then((rows) => {
            let obj = rows[0];
            res.json({ result: obj[Object.keys(obj)[0]] });
        });
});

router.post('/subscribe/:chnl', (req, res) => {
    db.query(`SELECT Subscribes_Insert('${req.params.chnl}', '${req.user.username}')`)
        .then((rows) => {
            let obj = rows[0];
            res.json({ result: obj[Object.keys(obj)[0]] });
        });
});

router.delete('/unsubscribe/:chnl', (req, res) => {
    db.query(`SELECT Subscribes_Delete('${req.params.chnl}', '${req.user.username}')`)
        .then((rows) => {
            let obj = rows[0];
            res.json({ result: obj[Object.keys(obj)[0]] });
        });
});

router.post('/view/:videoId', (req, res) => {
    db.query(`CALL AccViewsVid('${req.user.username}', '${req.params.videoId}')`)
        .then(function () {
            res.end();
        });
});

router.post('/like/:videoId', (req, res) => {
    db.query(`CALL AccLikesVid('${req.user.username}', ${req.params.videoId}, 1)`)
        .then(function () {
            res.end();
        });
});

router.post('/dislike/:videoId', (req, res) => {
    db.query(`CALL AccLikesVid('${req.user.username}', '${req.params.videoId}', -1)`)
        .then(function () {
            res.end();
        });
});

/* delete like/dislike */
router.post('/unlike/:videoId', (req, res) => {
    db.query(`CALL AccUnLikesVid('${req.user.username}', ${req.params.videoId})`)
        .then(function () {
            res.end();
        });
});


/* get like status */
router.get('/checkLike/:videoId', (req, res) => {
    db.query(`SELECT CheckLike('${req.user.username}', '${req.params.videoId}')`)
        .then((rows) => {
            let obj = rows[0];
            res.json({ result: obj[Object.keys(obj)[0]] });
        });
});

/******************************************** COMMENT *********************************************/

router.post('/likeComment/:cmtId', (req, res) => {
    db.query(`SELECT Comment_Like('${req.user.username}', ${req.params.cmtId}, 1)`).then(() => res.end());
})

router.post('/dislikeComment/:cmtId', (req, res) => {
    db.query(`SELECT Comment_Like('${req.user.username}', ${req.params.cmtId}, -1)`).then(() => res.end());
})

router.post('/unlikeComment/:cmtId', (req, res) => {
    db.query(`SELECT Comment_UnLike('${req.user.username}', ${req.params.cmtId})`).then(() => res.end());
})

router.get('/subscribersCount/:chnl', (req, res) => {
    db.query(`SELECT Account_SubscribersCount('${req.params.chnl}')`)
        .then((rows) => {
            let obj = rows[0];
            res.json({ result: obj[Object.keys(obj)[0]] });
        });
})

router.get('/comments/:videoId', (req, res) => {
    db.query(`CALL Comment_List(${req.params.videoId})`)
        .then((rows) => res.json(rows[0]));
});

router.post('/comments', (req, res) => {
    db.query(`SELECT Comment_Insert('${req.user.username}', ${req.body.videoId}, '${req.body.content}')`).then(() => res.end());
});

router.delete('/comment', (req, res) => {
    db.query(`SELECT Comment_Delete('${req.user.username}', ${req.query.videoId}, ${req.query.commentId})`).then(() => res.end());
});

router.get('/checkCommentLike/:cmtId', (req, res) => {
    db.query(`SELECT CheckCommentLike('${req.user.username}', ${req.params.cmtId})`)
        .then((rows) => {
        let obj = rows[0];
        res.json({ result: obj[Object.keys(obj)[0]] });
    });
});

router.post('/reply', (req, res) => {
    db.query(`SELECT Reply_Insert('${req.user.username}', ${req.body.cmtId}, '${req.body.content}')`).then(() => res.end());
})

module.exports = router;