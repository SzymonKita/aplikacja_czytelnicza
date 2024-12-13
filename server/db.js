const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BookApp'
});

db.connect((err) => {
    if (err) {
        console.error('Nie udało się połączyć z bazą danych:', err);
    } else {
        console.log('Połączono z bazą danych MySQL.');
    }
});

module.exports = db;
