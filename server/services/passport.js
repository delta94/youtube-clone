const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    console.log('serialize', user);
    done(null, user.username);    // serializeUser with the token of user.id
});

passport.deserializeUser((username, done) => {
    console.log('deserialize')

    User.findUserByUsername(username, function (user) {
        console.log('------------>', user);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
});


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    User.findUserByUsername({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
            done(null, existingUser)
        } else {
            (new User({ googleId: profile.id })).save().then(user => done(null, user));
        }
    })
}))


passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log(username, password);
        User.findUserByUsername(username, existingUser => {
            if (!existingUser) {
                done(null, false);
            } else {
                User.comparePassword(password, existingUser.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, existingUser);
                    } else {
                        return done(null, false);
                    }
                });
            } 
        });
    }
));