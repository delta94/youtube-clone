const passport = require('passport');
const express = require('express');
const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
})

router.post('/local', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            return res.json({ success: false });
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.json({ success: true });
        });
    })(req, res, next);
});

module.exports = router;