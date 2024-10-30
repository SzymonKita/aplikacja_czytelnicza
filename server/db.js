const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BookApp'
});

connection.connect((err) => {
    if (err) {
        console.error('Błąd połączenia: ' + err.stack);
        return;
    }
    console.log('Połączono jako ID ' + connection.threadId);
});

module.exports = connection;
