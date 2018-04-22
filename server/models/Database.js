const config = require('../config/mysqlConfig');
const mysql = require('mysql');

module.exports = class Database {
    constructor() {
        this.connection = mysql.createConnection(config);
        this.connection.connect((err) => {
            if (err) {
                throw err;
            } else {
                console.log('Successfully connected to MySQL');
            }
        })
    }
    query(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}