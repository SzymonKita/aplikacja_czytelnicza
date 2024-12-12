const mysql = require('mysql2');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db",
    port: 3306,
    timezone: '+01:00'
});

module.exports = db.promise();
