const passport = require('passport');
var User = require('../models/User');
se

module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/api/current_user', (req, res) => { // this line shows the result after deserializing user from cookie
        res.json(req.user);
    });

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/');
    })

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.post('/api/signup', (req, res) => {        
        User.findUserByUsername(req.body.username, (user) => {
            if (user) {
                return res.json({success: false, message: "username already exists"});
            } else {
                User.createUser({ username: req.body.username, password: req.body.password }, () => {
                return res.json({success: true});
                });
            }
        });

    });

    app.post('/auth/local', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) { return next(err) }
            if (!user) {
                return res.send({ success: false });
            }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                res.send({success: true});
            });
        })(req, res, next);
    });

