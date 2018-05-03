var syncMySQL = require('sync-mysql');
const config = require('../config/mysqlConfig');

module.exports = class SyncDatabase {
    constructor() {
        this.connection = new syncMySQL(config);
    }

    query(sql) {
        return this.connection.query(sql);
    }
}