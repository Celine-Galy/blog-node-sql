const mysql = require('mysql');

class DBManager {
    db;
    constructor() {
        this.db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'blog'
        });
        this.db.connect(function(err) {
            if (err) throw err;
            console.log("tu es bien connectée à la base de donnée!");

        });

        console.log('DB MANAGER CONSTRUCT');

    }
    getDB() {
        return this.db;
    }
    set db(value) {
        this.db = value;
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.db.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
}
module.exports = DBManager;