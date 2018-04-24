var Database = require('./database');
var bcrypt = require('bcrypt');

module.exports.createUser = function (user, cb) {
    const db = new Database();
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            db.query(`INSERT INTO user(username, password) VALUES ('${user.username}', '${user.password}')`)
                
                .then(rows => {
                    cb();
                })
                .catch(err => {
                    throw err;
                });
        });
    })
}

module.exports.findUserByUsername = function (username, cb) {
    const db = new Database();
    db.query(`SELECT * FROM user WHERE username='${username}'`)
        .then(rows => cb(rows[0])
        .catch(err => {
            throw err;
        }));
}

module.exports.comparePassword = function (candidatePassword, hash, cb) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        console.log(isMatch);
        cb(null, isMatch);
    })
}