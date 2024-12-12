const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const { formatTimestamp } = require('./utils');
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
            user: { id: user.ID, login: user.login, email: user.email, admin: user.Admin}
        });
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

app.get('/books/pending', (req, res) => {
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
            b.Confirmed = 0
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
            CONVERT_TZ(b.ReleaseDate, '+00:00', '+01:00') AS ReleaseDate,
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
        console.log(result);
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

//Nie działa poprawnie dodawania i wyszukiwanie wielu kategori
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

    const checkQuery = `
        SELECT * FROM Bookshelf WHERE UserID = ? AND BookID = ?
    `;

    db.query(checkQuery, [userID, bookID], (err, results) => {
        if (err) {
            console.error('Error checking bookshelf:', err);
            return res.status(500).json({ error: 'Server error' });
        }

        if (results.length > 0) {
            return res.status(409).json({ error: 'Book already exists in your bookshelf' });
        }

        const insertQuery = `
            INSERT INTO Bookshelf (UserID, BookID, Finished, Favourite, Abandoned, CustomPages)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        db.query(
            insertQuery, 
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
});


app.get('/bookshelf/:userID', (req, res) => {
    const userID = req.params.userID;

    const query = `
        SELECT 
            b.ID, 
            b.Title, 
            a.FirstName AS AuthorFirstName, 
            a.LastName AS AuthorLastName, 
            b.Cover,
            bs.ID as BookshelfID,
            bs.Favourite,
            bs.Abandoned,
            b.Pages,
            bs.CustomPages as PagesRead,
            bs.Finished
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

app.get('/bookshelfFavourite/:userID', (req, res) => {
    const userID = req.params.userID;

    const query = `
        SELECT 
            b.ID, 
            b.Title, 
            a.FirstName AS AuthorFirstName, 
            a.LastName AS AuthorLastName, 
            b.Cover,
            bs.ID as BookshelfID,
            bs.Favourite,
            bs.Abandoned,
            b.Pages,
            bs.CustomPages as PagesRead
        FROM 
            Book b
        JOIN Author a ON b.AuthorID = a.ID
        JOIN Bookshelf bs ON b.ID = bs.BookID
        WHERE 
            bs.UserID = ? and bs.Favourite = 1
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

app.patch('/api/bookshelf/:id', (req, res) => {
    const { id } = req.params;
    const { finished } = req.body;

    const query = 'UPDATE Bookshelf SET finished = ? WHERE ID = ?';
    db.query(query, [finished, id], (error, results) => {
        if (error) {
            console.error('Błąd podczas aktualizacji:', error);
            return res.status(500).json({ error: 'Nie udało się zaktualizować rekordu.' });
        }
        res.status(200).json({ message: 'Pole finished zostało zaktualizowane.' });
    });
});


app.get('/api/current-session/:userID', (req, res) => {
    const userID = req.params.userID;
    const query = `
        SELECT 
            s.ID AS sessionID, 
            bs.ID AS bookshelfID, 
            b.ID AS bookID, 
            b.Title, 
            a.FirstName AS AuthorFirstName, 
            a.LastName AS AuthorLastName, 
            b.Pages, 
            bs.CustomPages AS PagesRead,
            b.Cover
        FROM 
            Session s
        JOIN Bookshelf bs ON s.BookshelfID = bs.ID
        JOIN Book b ON bs.BookID = b.ID
        JOIN Author a ON b.AuthorID = a.ID
        WHERE 
            bs.UserID = ? AND s.TimeEnd IS NULL
    `;

    db.query(query, [userID], (err, result) => {
        if (err) {
            console.error('Błąd podczas pobierania aktualnej sesji:', err);
            return res.status(500).json({ error: 'Błąd podczas pobierania aktualnej sesji' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Brak aktywnej sesji' });
        }

        const session = result[0];
        res.status(200).json({
            sessionID: session.sessionID,
            bookshelfID: session.bookshelfID,
            id: session.bookID,
            title: session.Title,
            author: `${session.AuthorFirstName} ${session.AuthorLastName}`,
            pages: session.Pages,
            pagesRead: session.PagesRead,
            cover: session.Cover,
        });
    });
});




app.post('/api/sessions', (req, res) => {
    const { bookshelfID, pagesRead, timeStart, timeEnd } = req.body;

    const timeEndFormatted = formatTimestamp(timeEnd);

    const insertQuery = `
        UPDATE Session
        SET PagesRead = ?, TimeEnd = ?
        WHERE ID = (
        SELECT MAX(ID) FROM Session WHERE BookshelfID = ?
        );
    `;

    const updateQuery = `
        UPDATE Bookshelf
        SET CustomPages = CustomPages + ?
        WHERE ID = ?
    `;

    db.beginTransaction((err) => {
        if (err) {
            console.error('Błąd rozpoczęcia transakcji:', err);
            return res.status(500).json({ error: 'Błąd zakończenia sesji' });
        }

        db.query(insertQuery, [pagesRead, timeEndFormatted,bookshelfID], (err) => {
            if (err) {
                return db.rollback(() => {
                    console.error('Błąd aktualizacji sesji:', err);
                    res.status(500).json({ error: 'Nie udało się zaktualizować sesji' });
                });
            }

            db.query(updateQuery, [pagesRead, bookshelfID], (err) => {
                if (err) {
                    return db.rollback(() => {
                        console.error('Błąd aktualizacji postępu:', err);
                        res.status(500).json({ error: 'Nie udało się zaktualizować postępu' });
                    });
                }

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            console.error('Błąd zatwierdzania transakcji:', err);
                            res.status(500).json({ error: 'Błąd zakończenia sesji' });
                        });
                    }

                    res.status(200).json({ message: 'Sesja została zakończona pomyślnie' });
                });
            });
        });
    });
});



app.post('/api/start-session', (req, res) => {
    const { bookshelfID, bookID, timeStart } = req.body;

    const query = `
        INSERT INTO Session (BookshelfID, BookID, TimeStart)
        VALUES (?, ?, ?)
    `;

    db.query(query, [bookshelfID, bookID, timeStart], (err, result) => {
        if (err) {
            console.error('Błąd rozpoczęcia sesji:', err);
            return res.status(500).json({ error: 'Nie udało się rozpocząć sesji' });
        }

        res.status(201).json({ message: 'Sesja została rozpoczęta', sessionID: result.insertId });
    });
});


app.put('/api/end-session/:sessionID', (req, res) => {
    const { sessionID } = req.params;
    const { timeEnd, pagesRead } = req.body;

    const query = `
        UPDATE Session 
        SET TimeEnd = ?, PagesRead = ?
        WHERE ID = ? AND TimeEnd IS NULL
    `;

    db.query(query, [timeEnd, pagesRead, sessionID], (err, result) => {
        if (err) {
            console.error('Błąd zamykania sesji:', err);
            return res.status(500).json({ error: 'Nie udało się zamknąć sesji' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nie znaleziono aktywnej sesji' });
        }

        res.status(200).json({ message: 'Sesja została zamknięta' });
    });
});

app.get('/api/check-session/:bookshelfID', (req, res) => {
    const { bookshelfID } = req.params;

    const query = `
        SELECT ID 
        FROM Session
        WHERE BookshelfID = ? AND TimeEnd IS NULL
    `;

    db.query(query, [bookshelfID], (err, result) => {
        if (err) {
            console.error('Błąd sprawdzania sesji:', err);
            return res.status(500).json({ error: 'Błąd sprawdzania statusu sesji' });
        }

        if (result.length === 0) {
            return res.status(200).json({ active: false });
        }

        res.status(200).json({ active: true, sessionID: result[0].ID });
    });
});

app.put('/api/update-favourite', (req, res) => {
    const { bookshelfID, favourite } = req.body;

    const query = `UPDATE Bookshelf SET favourite = ? WHERE ID = ?`;
    db.query(query, [favourite, bookshelfID], (err, result) => {
        if (err) {
            console.error('Błąd podczas aktualizacji statusu:', err);
            return res.status(500).send({ message: 'Błąd serwera' });
        }

        res.status(200).send({ message: 'Status książki zaktualizowany pomyślnie' });
    });
});

app.put('/api/update-abandoned', (req, res) => {
    const { bookshelfID, abandoned } = req.body;

    const query = `UPDATE Bookshelf SET abandoned = ? WHERE ID = ?`;
    db.query(query, [abandoned, bookshelfID], (err, result) => {
        if (err) {
            console.error('Błąd podczas aktualizacji statusu:', err);
            return res.status(500).send({ message: 'Błąd serwera' });
        }

        res.status(200).send({ message: 'Status książki zaktualizowany pomyślnie' });
    });
});

app.put('/books/:bookId/approve', (req, res) => {
    const { bookId } = req.params;
    const {
        title,
        author,
        publisher,
        series,
        releaseDate,
        description,
        pages,
        cover,
        categories
    } = req.body;

    const updateBookQuery = `
        UPDATE Book 
        SET 
            Title = ?, 
            Author = ?, 
            Publisher = ?, 
            Series = ?, 
            ReleaseDate = ?, 
            Description = ?, 
            Pages = ?, 
            Cover = ?, 
            Confirmed = 1 
        WHERE ID = ? AND Confirmed = 0
    `;

    db.beginTransaction(err => {
        if (err) {
            console.error('Błąd rozpoczynania transakcji:', err);
            return res.status(500).json({ error: 'Nie udało się zatwierdzić książki' });
        }

        
        db.query(updateBookQuery, [title, author, publisher, series, releaseDate, description, pages, cover, bookId], (err, result) => {
            if (err) {
                console.error('Błąd aktualizacji książki:', err);
                return db.rollback(() => {
                    res.status(500).json({ error: 'Nie udało się zatwierdzić książki' });
                });
            }

            
            const deleteCategoriesQuery = `DELETE FROM BookCategories WHERE BookID = ?`;
            db.query(deleteCategoriesQuery, [bookId], (err) => {
                if (err) {
                    console.error('Błąd usuwania kategorii:', err);
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Nie udało się zatwierdzić książki' });
                    });
                }

                
                if (categories.length > 0) {
                    const insertCategoriesQuery = `INSERT INTO bookcategory (BookID, CategoryID) VALUES ?`;
                    const categoryValues = categories.map(categoryId => [bookId, categoryId]);

                    db.query(insertCategoriesQuery, [categoryValues], (err) => {
                        if (err) {
                            console.error('Błąd dodawania kategorii:', err);
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Nie udało się zatwierdzić książki' });
                            });
                        }

                        db.commit(err => {
                            if (err) {
                                console.error('Błąd zatwierdzania transakcji:', err);
                                return db.rollback(() => {
                                    res.status(500).json({ error: 'Nie udało się zatwierdzić książki' });
                                });
                            }

                            res.status(200).json({ message: 'Książka została zatwierdzona' });
                        });
                    });
                } else {
                    
                    db.commit(err => {
                        if (err) {
                            console.error('Błąd zatwierdzania transakcji:', err);
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Nie udało się zatwierdzić książki' });
                            });
                        }

                        res.status(200).json({ message: 'Książka została zatwierdzona' });
                    });
                }
            });
        });
    });
});

app.put('/books/:bookId/confirm', (req, res) => {
    const { bookId } = req.params;

    const query = `
        UPDATE Book 
        SET Confirmed = 1 
        WHERE ID = ? AND Confirmed = 0
    `;

    db.query(query, [bookId], (err, result) => {
        if (err) {
            console.error('Błąd zatwierdzania książki:', err);
            return res.status(500).json({ error: 'Nie udało się zatwierdzić książki' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nie znaleziono książki do zatwierdzenia lub już została zatwierdzona' });
        }

        res.status(200).json({ message: 'Książka została zatwierdzona' });
    });
});




app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

module.exports = app;
