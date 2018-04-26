var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Database = require('../models/Database');

router.get('/current_user', (req, res) => { // this line shows the result after deserializing user from cookie
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
            User.createUser({ username: req.body.username, password: req.body.password }, () => {
                return res.json({success: true});
            });
        }
    });

});

router.get('/users', (req, res) => {
    let db = new Database();
    db.query('CALL `GetUsers`').then(rows => console.log(rows));
});

module.exports = router;