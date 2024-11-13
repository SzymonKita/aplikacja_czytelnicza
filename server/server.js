// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
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

// Endpoint do pobierania wszystkich książek z ich kategoriami
app.get('/books', (req, res) => {
    const query = `
        SELECT 
            b.ID, 
            b.Title, 
            a.FirstName AS AuthorFirstName, 
            a.LastName AS AuthorLastName,
            p.Name AS Publisher, 
            GROUP_CONCAT(c.Name SEPARATOR ', ') AS Categories, 
            s.Name AS Series, 
            b.Cover, 
            b.Pages, 
            b.Confirmed, 
            b.ReleaseDate
        FROM 
            Book b
        JOIN Author a ON b.AuthorID = a.ID
        JOIN Publisher p ON b.PublisherID = p.ID
        LEFT JOIN BookCategory bc ON b.ID = bc.BookID
        LEFT JOIN Category c ON bc.CategoryID = c.ID
        LEFT JOIN Series s ON b.SeriesID = s.ID
        WHERE 
            b.Confirmed = 1
        GROUP BY 
            b.ID, 
            b.Title, 
            a.FirstName, 
            a.LastName, 
            p.Name, 
            s.Name, 
            b.Cover, 
            b.Pages, 
            b.Confirmed, 
            b.ReleaseDate
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

    const query = `
        SELECT 
            b.ID, 
            b.Title, 
            a.FirstName AS AuthorFirstName, 
            a.LastName AS AuthorLastName, 
            p.Name AS Publisher, 
            GROUP_CONCAT(c.Name SEPARATOR ', ') AS Categories, 
            s.Name AS Series, 
            b.Cover, 
            b.Pages, 
            b.Confirmed, 
            b.ReleaseDate,
            b.Description
        FROM 
            Book b
        JOIN Author a ON b.AuthorID = a.ID
        JOIN Publisher p ON b.PublisherID = p.ID
        LEFT JOIN BookCategory bc ON b.ID = bc.BookID
        LEFT JOIN Category c ON bc.CategoryID = c.ID
        LEFT JOIN Series s ON b.SeriesID = s.ID
        WHERE 
            b.ID = ?
        GROUP BY 
            b.ID, 
            b.Title, 
            a.FirstName, 
            a.LastName, 
            p.Name, 
            s.Name, 
            b.Cover, 
            b.Pages, 
            b.Confirmed, 
            b.ReleaseDate,
            b.Description
    `;

    db.query(query, [bookId], (err, result) => {
        if (err) {
            console.error('Błąd podczas pobierania danych o książce:', err);
            return res.status(500).json({ error: 'Błąd podczas pobierania danych o książce' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Książka nie znaleziona' });
        }

        const book = result[0];
        res.status(200).json(book);
    });
});


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
        const { title, author, publisher, categories, series, releaseDate, description, pages, confirmed, cover } = req.body;

        let authorID;
        const authorResult = await queryDatabase('SELECT ID FROM Author WHERE FirstName = ? AND LastName = ?', [author.firstName, author.lastName]);
        if (authorResult.length > 0) {
            authorID = authorResult[0].ID;
        } else {
            const insertAuthorResult = await queryDatabase('INSERT INTO Author (FirstName, LastName) VALUES (?, ?)', [author.firstName, author.lastName]);
            authorID = insertAuthorResult.insertId;
        }

        let publisherID;
        const publisherResult = await queryDatabase('SELECT ID FROM Publisher WHERE Name = ?', [publisher]);
        if (publisherResult.length > 0) {
            publisherID = publisherResult[0].ID;
        } else {
            const insertPublisherResult = await queryDatabase('INSERT INTO Publisher (Name) VALUES (?)', [publisher]);
            publisherID = insertPublisherResult.insertId;
        }

        let seriesID = null;
        if (series) {
            const seriesResult = await queryDatabase('SELECT ID FROM Series WHERE Name = ?', [series]);
            if (seriesResult.length > 0) {
                seriesID = seriesResult[0].ID;
            } else {
                const insertSeriesResult = await queryDatabase('INSERT INTO Series (Name) VALUES (?)', [series]);
                seriesID = insertSeriesResult.insertId;
            }
        }

        const insertBookQuery = `
            INSERT INTO Book (Title, AuthorID, PublisherID, SeriesID, ReleaseDate, Description, Pages, Confirmed, Cover)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const bookData = [title, authorID, publisherID, seriesID, releaseDate, description, pages, confirmed || 0, cover];
        const bookResult = await queryDatabase(insertBookQuery, bookData);
        const bookID = bookResult.insertId;

        if (Array.isArray(categories) && categories.length > 0) {
            const categoryPromises = categories.map(async (category) => {
                let categoryID;
                const categoryResult = await queryDatabase('SELECT ID FROM Category WHERE Name = ?', [category]);
                if (categoryResult.length > 0) {
                    categoryID = categoryResult[0].ID;
                } else {
                    const insertCategoryResult = await queryDatabase('INSERT INTO Category (Name) VALUES (?)', [category]);
                    categoryID = insertCategoryResult.insertId;
                }
                return queryDatabase('INSERT INTO BookCategory (BookID, CategoryID) VALUES (?, ?)', [bookID, categoryID]);
            });
            await Promise.all(categoryPromises);
        }

        res.status(201).json({ message: 'Książka została dodana', bookID });
    } catch (err) {
        console.error('Błąd podczas dodawania książki:', err);
        res.status(500).json({ error: 'Błąd podczas dodawania książki' });
    }
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'covers');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.post('/upload-cover', upload.single('cover'), (req, res) => {
    if (req.file) {
        res.json({ fileName: req.file.filename });
    } else {
        res.status(400).json({ error: 'Image upload failed' });
    }
});

app.post('/bookshelf', (req, res) => {
    const { userID, bookID, customPages, finished, favourite, abandoned } = req.body;

    const query = `
        INSERT INTO Bookshelf (UserID, BookID, Finished, Favourite, Abandoned, CustomPages)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    db.query(
        query, 
        [userID, bookID, finished || 0, favourite || 0, abandoned || 0, customPages || null], 
        (err, result) => {
            if (err) {
                console.error('Error adding book to bookshelf:', err);
                return res.status(500).json({ error: 'Server error' });
            }
            res.status(201).json({ message: 'Book added to bookshelf', bookshelfID: result.insertId });
        }
    );
});

app.get('/bookshelf/:userID', (req, res) => {
    const userID = req.params.userID;

    const query = `
        SELECT 
            b.ID, 
            b.Title, 
            a.FirstName AS AuthorFirstName, 
            a.LastName AS AuthorLastName, 
            b.Cover 
        FROM 
            Book b
        JOIN Author a ON b.AuthorID = a.ID
        JOIN Bookshelf bs ON b.ID = bs.BookID
        WHERE 
            bs.UserID = ?
    `;

    db.query(query, [userID], (err, result) => {
        if (err) {
            console.error('Błąd podczas pobierania książek z biblioteczki:', err);
            return res.status(500).json({ error: 'Błąd podczas pobierania książek z biblioteczki' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Brak książek w biblioteczce' });
        }

        res.status(200).json(result);
    });
});

  

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
