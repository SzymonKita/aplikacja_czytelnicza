const mysql = require('mysql2');

const dbtest = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db",
    port: 3306,
    timezone: '+01:00'
});

module.exports = dbtest.promise();
