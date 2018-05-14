const config = require('../config/mysqlConfig');
const mysql = require('mysql');
class Database {
    constructor() {        
        this.pool  = mysql.createPool(config);
    }
    query(sql, values) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                if (values) {
                    connection.query(sql, values, (error, results, field) => {
                        connection.release();
                        if (error) return reject(error);
                        return resolve(results, field);
                    });
                } else {
                    connection.query(sql, (error, results, field) => {
                        connection.release();
                        if (error) return reject(error);
                        return resolve(results, field);
                    });    
                }

            }); 
        });
    };
};
module.exports = Database;