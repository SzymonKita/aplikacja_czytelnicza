const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { login, password, email } = req.body;

    if (!login || !password || !email) {
        return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
    }

    db.query('SELECT * FROM User WHERE login = ?', [login], async (err, result) => {
        if (err) return res.status(500).json({ error: 'Błąd serwera' });
        if (result.length > 0) return res.status(400).json({ error: 'Login już istnieje' });

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query('INSERT INTO User (login, password, email, Activated, Admin, Status, LastOnline) VALUES (?, ?, ?, 1, 0, "Active", NOW())',
            [login, hashedPassword, email],
            (err, result) => {
                if (err) {
                    console.error('Błąd podczas rejestracji:', err);
                    return res.status(500).json({ error: 'Błąd podczas rejestracji' });
                }
                
                const userId = result.insertId;
                db.query('INSERT INTO statistics (UserID, ReadingSpeed, TotalTime) VALUES (?, 0, 0)',
                    [userId],
                    (err) => {
                        if (err) {
                            console.error('Błąd podczas tworzenia rekordu w tabeli statistics:', err);
                            return res.status(500).json({ error: 'Błąd podczas tworzenia rekordu w tabeli statistics' });
                        }

                        res.status(201).json({ message: 'Rejestracja zakończona sukcesem' });
                    }
                );
            }
        );
    });
});

router.post('/login', async (req, res) => {
    const { login, password } = req.body;

    db.query('SELECT * FROM User WHERE login = ?', [login], async (err, result) => {
        if (err) return res.status(500).json({ error: 'Błąd serwera' });
        if (result.length === 0) return res.status(400).json({ error: 'Nieprawidłowy login lub hasło' });

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Nieprawidłowy login lub hasło' });
        }

        const token = jwt.sign(
            {
                id: user.ID,
                login: user.login,
                email: user.email,
                admin: user.Admin
            },
            'sekretny_klucz',
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: 'Logowanie zakończone sukcesem',
            token,
            user: { id: user.ID, login: user.login, email: user.email, admin: user.Admin }
        });
    });
});

module.exports = router;
