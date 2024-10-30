// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Konfiguracja połączenia z bazą danych MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BookApp'
});

// Połączenie z bazą danych
db.connect((err) => {
    if (err) {
        console.error('Nie udało się połączyć z bazą danych:', err);
    } else {
        console.log('Połączono z bazą danych MySQL.');
    }
});

// Rejestracja użytkownika
app.post('/register', async (req, res) => {
    const { login, password, email } = req.body;

    // Walidacja danych
    if (!login || !password || !email) {
        return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
    }

    // Sprawdzanie, czy użytkownik już istnieje
    db.query('SELECT * FROM User WHERE login = ?', [login], async (err, result) => {
        if (err) return res.status(500).json({ error: 'Błąd serwera' });
        if (result.length > 0) return res.status(400).json({ error: 'Login już istnieje' });

        // Haszowanie hasła
        const hashedPassword = await bcrypt.hash(password, 10);

        // Wstawianie nowego użytkownika do bazy danych
        db.query('INSERT INTO User (login, password, email, Activated, Admin, Status, LastOnline) VALUES (?, ?, ?, 1, 0, "Active", NOW())', 
            [login, hashedPassword, email], 
            (err, result) => {
                if (err) {
                    console.error('Błąd podczas rejestracji:', err);
                    res.status(500).json({ error: 'Błąd podczas rejestracji' });
                } else {
                    res.status(201).json({ message: 'Rejestracja zakończona sukcesem' });
                }
            }
        );
    });
});

// Logowanie użytkownika
app.post('/login', async (req, res) => {
  const { login, password } = req.body;

  db.query('SELECT * FROM User WHERE login = ?', [login], async (err, result) => {
      if (err) return res.status(500).json({ error: 'Błąd serwera' });
      if (result.length === 0) return res.status(400).json({ error: 'Nieprawidłowy login lub hasło' });

      const user = result[0];

      // Porównanie hasła
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ error: 'Nieprawidłowy login lub hasło' });
      }

      // Generowanie tokena
      const token = jwt.sign({ id: user.ID, login: user.login }, 'sekretny_klucz', { expiresIn: '1h' });

      // Zalogowano pomyślnie
      res.status(200).json({ message: 'Logowanie zakończone sukcesem', token, user: { id: user.ID, login: user.login, email: user.email } });
  });
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
