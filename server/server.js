// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/covers', express.static(path.join(__dirname, 'covers')));

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

app.post('/register', async (req, res) => {
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
                    res.status(500).json({ error: 'Błąd podczas rejestracji' });
                } else {
                    res.status(201).json({ message: 'Rejestracja zakończona sukcesem' });
                }
            }
        );
    });
});

app.post('/login', async (req, res) => {
    const { login, password } = req.body;

    db.query('SELECT * FROM User WHERE login = ?', [login], async (err, result) => {
        if (err) return res.status(500).json({ error: 'Błąd serwera' });
        if (result.length === 0) return res.status(400).json({ error: 'Nieprawidłowy login lub hasło' });

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Nieprawidłowy login lub hasło' });
        }

        const token = jwt.sign({ id: user.ID, login: user.login }, 'sekretny_klucz', { expiresIn: '1h' });

        res.status(200).json({ message: 'Logowanie zakończone sukcesem', token, user: { id: user.ID, login: user.login, email: user.email } });
    });
});

app.get('/books', (req, res) => {
    const query = `
        SELECT 
            b.ID, 
            b.Title, 
            a.FirstName AS AuthorFirstName, 
            a.LastName AS AuthorLastName,
            p.Name AS Publisher, 
            c.Name AS Category, 
            s.Name AS Series, 
            b.Cover, 
            b.Pages, 
            b.Confirmed, 
            b.ReleaseDate
        FROM 
            Book b
        JOIN Author a ON b.AuthorID = a.ID
        JOIN Publisher p ON b.PublisherID = p.ID
        JOIN Category c ON b.CategoryID = c.ID
        LEFT JOIN Series s ON b.SeriesID = s.ID
        WHERE 
            b.Confirmed = 1
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Błąd podczas pobierania książek:', err);
            return res.status(500).json({ error: 'Błąd serwera' });
        }

        res.json(results);
    });
});


app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;

    db.query(
        `SELECT b.ID, b.Title, a.FirstName AS AuthorFirstName, a.LastName AS AuthorLastName, 
                p.Name AS Publisher, c.Name AS Category, s.Name AS Series, 
                b.Cover, b.Pages, b.Confirmed, b.ReleaseDate 
         FROM Book b
         JOIN Author a ON b.AuthorID = a.ID
         JOIN Publisher p ON b.PublisherID = p.ID
         JOIN Category c ON b.CategoryID = c.ID
         LEFT JOIN Series s ON b.SeriesID = s.ID
         WHERE b.ID = ?`, 
         [bookId], 
         (err, result) => {
            if (err) {
                console.error('Błąd podczas pobierania danych o książce:', err);
                return res.status(500).json({ error: 'Błąd podczas pobierania danych o książce' });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: 'Książka nie znaleziona' });
            }

            const book = result[0];
            res.status(200).json(book);
        }
    );
});

// Helper function to query database with promises
const queryDatabase = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

app.post('/suggest-book', async (req, res) => {
    try {
        const { title, author, publisher, category, series, releaseDate, description, pages, confirmed } = req.body;

        // Sprawdzenie lub dodanie autora
        let authorID;
        const authorResult = await queryDatabase('SELECT ID FROM Author WHERE FirstName = ? AND LastName = ?', [author.firstName, author.lastName]);
        if (authorResult.length > 0) {
            authorID = authorResult[0].ID;
        } else {
            const insertAuthorResult = await queryDatabase('INSERT INTO Author (FirstName, LastName) VALUES (?, ?)', [author.firstName, author.lastName]);
            authorID = insertAuthorResult.insertId;
        }

        // Sprawdzenie lub dodanie wydawcy
        let publisherID;
        const publisherResult = await queryDatabase('SELECT ID FROM Publisher WHERE Name = ?', [publisher]);
        if (publisherResult.length > 0) {
            publisherID = publisherResult[0].ID;
        } else {
            const insertPublisherResult = await queryDatabase('INSERT INTO Publisher (Name) VALUES (?)', [publisher]);
            publisherID = insertPublisherResult.insertId;
        }

        // Sprawdzenie lub dodanie kategorii
        let categoryID;
        const categoryResult = await queryDatabase('SELECT ID FROM Category WHERE Name = ?', [category]);
        if (categoryResult.length > 0) {
            categoryID = categoryResult[0].ID;
        } else {
            const insertCategoryResult = await queryDatabase('INSERT INTO Category (Name) VALUES (?)', [category]);
            categoryID = insertCategoryResult.insertId;
        }

        // Sprawdzenie lub dodanie serii
        let seriesID = null;
        if (series) {
            const checkSeriesQuery = 'SELECT ID FROM Series WHERE Name = ?';
            db.query(checkSeriesQuery, [series], (err, seriesResult) => {
                if (err) return res.status(500).json({ error: 'Error checking series' });
                seriesID = seriesResult.length > 0 ? seriesResult[0].ID : null;

                if (!seriesID) {
                    const insertSeriesQuery = 'INSERT INTO Series (Name) VALUES (?)';
                    db.query(insertSeriesQuery, [series], (err, insertSeriesResult) => {
                        if (err) return res.status(500).json({ error: 'Error adding series' });
                        seriesID = insertSeriesResult.insertId;
                    });
                }
            });
        }

        // Dodanie książki po uzyskaniu wszystkich ID
        const insertBookQuery = `
        INSERT INTO Book (Title, AuthorID, PublisherID, CategoryID, SeriesID, ReleaseDate, Description, Pages, Confirmed)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)
        `;
        const bookData = [title, authorID, publisherID, categoryID, seriesID, releaseDate, description, pages, confirmed];    
        await queryDatabase(insertBookQuery, bookData);

        res.status(201).json({ message: 'Książka została dodana' });
    } catch (err) {
        console.error('Błąd podczas dodawania książki:', err);
        res.status(500).json({ error: 'Błąd podczas dodawania książki' });
    }
});



app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
