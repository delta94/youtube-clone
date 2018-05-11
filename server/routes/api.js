var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Database = require('../models/Database');
let db = new Database();
let SyncDatabase = require('../models/SyncDatabase');
let sdb = new SyncDatabase();   


/************************************* USER *********************************/

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

router.get('/subscriptionCount', (req, res) => {
    db.query(`SELECT COUNT(*) AS count FROM subscribes WHERE subscriber_name = '${req.user.username}'`).then((rows) => res.json(rows[0].count));
});

//list all user's video
router.get('/videos/:username', (req, res) => {
    db.query(`select id,  name as title, 
    dtime_upload as publishedAt, 
    GetVideoViewCount(id) as viewCount
    from video
    where upload_account='${req.params.username}'`).then((rows) => res.json(rows));
});

router.get('/checkForSubscriptions/:chnl', (req, res) => {
    db.query(`SELECT Subscribes_CheckExist('${req.params.chnl}', '${req.user.username}')`)
        .then((rows) => {
            let obj = rows[0];
            res.json({ result: obj[Object.keys(obj)[0]] });
        });
});

router.get('/channelInfo/:chnl', (req, res) => {
    db.query(`SELECT Account_SubscribersCount('${req.params.chnl}') AS subscriberCount, name as channelTitle, username
                FROM account
                WHERE username='${req.params.chnl}'`)
        .then((rows) => res.json(rows[0]));
});

router.get('/subscribersCount/:chnl', (req, res) => {
    db.query(`SELECT Account_SubscribersCount('${req.params.chnl}')`)
        .then((rows) => {
            let obj = rows[0];
            res.json({ result: obj[Object.keys(obj)[0]] });
        });
});

/******************************************** VIDEO *********************************************/
// get video's information
router.get('/video/:id', (req, res) => {
    let snippet = {};
    let localized = {};
    let statistics = {};
    let publishedAt = 0;
    if (isNaN(req.params.id)) return res.status(404).end();
    db.query(`SELECT Video_CheckExist('${req.params.id}') AS exist`).then((rows) => {
        if (!rows[0].exist) return res.status(404).end();
        else {
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
        }
    })
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

router.get('/recommendedVideo/:videoId', (req, res) => {
    let tags = [];
    let videos = [];
    db.query(`SELECT tags FROM video WHERE id=${req.params.videoId}`)
        .then((rows) => {
            if (!rows[0]) return res.end();
            else {
                tags = rows[0].tags.split(' ');
                for (tag of tags) {
                    videos = videos.concat(sdb.query(`SELECT id, name AS title, upload_account AS channelTitle, GetVideoViewCount(id) AS viewCount FROM video WHERE LOCATE('${tag}', tags) <> 0`));
                }
                videos = videos.filter((video) => video.id != req.params.videoId);
                res.json(videos);
            }
        });
});

router.post('/watchLater/:videoId', (req, res) => {
    db.query(`CALL AccWatchsLaterVid('${req.user.username}', ${req.params.videoId})`).then((rows) => res.end());
});

router.get('/checkWatchLater/:videoId', (req, res) => {
    console.log('check');
    console.log(req.user.username, req.params.videoId);
    db.query(`SELECT * FROM a_watch_later_v WHERE account_name='${req.user.username}' AND video_id=${req.params.videoId}`)
        .then((rows) => res.json({result: !!rows[0]}))
});

router.get('/watchLater', (req, res) => {
    db.query(`CALL GetWatchedLaterVideos('${req.user.username}')`)
        .then((rows) => res.json(rows[0]));
});

router.get('/history', (req, res) => {
    db.query(`CALL GetHistory('${req.user.username}')`).then((rows) => res.json(rows[0]));
});


router.get('/trending/:bound', (req, res) => {
    db.query(`CALL GetTrending(${req.params.bound})`).then((rows) => res.json(rows[0]));
});

router.get('/likedVideos', (req, res) => {
    db.query(`CALL GetLikedVideos('${req.user.username}')`).then((rows) => res.json(rows[0]));
});

router.get('/playlists', (req, res) => {
    db.query(`CALL Playlist_ListPlaylist('${req.user.username}')`).then((rows) => res.json(rows[0]));
});

/******************************************** COMMENT *********************************************/

router.post('/likeComment', (req, res) => {
    db.query(`SELECT Comment_Like('${req.user.username}', ${req.body.cmtId}, 1)`).then(() => res.end());
});

router.post('/dislikeComment', (req, res) => {
    db.query(`SELECT Comment_Like('${req.user.username}', ${req.body.cmtId}, -1)`).then(() => res.end());
});

router.post('/unlikeComment/', (req, res) => {
    db.query(`SELECT Comment_UnLike('${req.user.username}', ${req.body.cmtId})`).then(() => res.end());
});



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
});


/******************************************** REPLY *********************************************/
router.get('/replies/:cmtId', (req, res) => {
    db.query(`CALL Reply_List(${req.params.cmtId})`)
        .then((rows) => res.json(rows[0]));
});

router.get('/checkReplyLike/:repId', (req, res) => {
    db.query(`SELECT CheckReplyLike('${req.user.username}', ${req.params.repId})`)
        .then((rows) => {
            let obj = rows[0];
            res.json({ result: obj[Object.keys(obj)[0]] });
        });
});

router.post('/likeReply/:repId', (req, res) => {
    db.query(`SELECT Reply_Like('${req.user.username}', ${req.params.repId}, 1)`).then(() => res.end());

});

router.post('/dislikeReply/:repId', (req, res) => {
    db.query(`SELECT Reply_Like('${req.user.username}', ${req.params.repId}, -1)`).then(() => res.end());

});

router.post('/unlikeReply/:repId', (req, res) => {
    db.query(`SELECT Reply_UnLike('${req.user.username}', ${req.params.repId})`).then(() => res.end());
});

router.post('/reply', (req, res) => {
    db.query(`SELECT Reply_Insert('${req.body.username}', ${req.body.cmtId}, ${req.body.content})`).then(() => res.end());
});

router.delete('/reply/:repId', (req, res) => {
    console.log('inside delete');
    db.query(`SELECT Reply_Delete(${req.params.repId})`).then(() => res.end());
});


/********************************************** PLAYLIST*****************************************/
router.get('/videosForPlaylist/:playlistId', (req, res) => {
    if (isNaN(req.params.playlistId)) {
        return res.status(304).end();
    } else {
        db.query(`SELECT Playlist_CheckPlaylistExist(${req.params.playlistId}) AS exist`).then((rows) => {
            if (!rows[0].exist) return res.status(404).end();
            else {
                db.query(`CALL Playstlist_GetVideos(${req.params.playlistId})`)
                    .then((rows) => res.json(rows[0]));
            }
        });
    }
});

/* playlist info */
router.get('/playlist/:playlistId', (req, res) => {
    db.query(`SELECT playlist_id AS id, name, owner FROM playlist WHERE playlist_id=${req.params.playlistId}`)
        .then((rows) => res.json(rows[0]));
});

router.get('/checkVideoInPlaylist', (req, res) => {
    db.query(`SELECT Playlist_CheckVideoInPlaylist(${req.query.pid}, ${req.query.vid}) AS ret`)
        .then((rows) => res.json({ result: rows[0].ret }));
});

router.post('/deleteVideo', (req, res) => {
    db.query(`SELECT PlaylistV_DeleteVideo(${req.body.pid}, ${req.body.vid})`)
        .then((rows) => res.end());
});

router.post('/insertVideo', (req, res) => {
    db.query(`SELECT PlaylistV_InsertVideo(${req.body.pid}, ${req.body.vid})`)
        .then((rows) => res.end());
});

/* create new playlist */
router.post('/playlist', (req, res) => {
    console.log(req.body);
    db.query(`INSERT INTO playlist(name, public, dtime, owner) VALUES('${req.body.name}',1,NOW(), '${req.body.username}')`)
        .then((rows) => 
            db.query(`SELECT AUTO_INCREMENT AS max_id
            FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'assignment' 
            AND TABLE_NAME = 'playlist'`).then((rows) => res.json({ 'result': rows[0].max_id - 1 }))
        );
});

module.exports = router;