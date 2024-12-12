const express = require('express');
const db = require('../db');
const multer = require('multer');
const router = express.Router();
const path = require('path');
router.use('/covers', express.static(path.join(__dirname, 'covers')));
router.get('/', (req, res) => {
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

router.get('/pending', (req, res) => {
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

router.get('/:id', (req, res) => {
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
        LEFT JOIN BookCategory bc ON bc.BookID = b.ID 
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

router.post('/suggest', async (req, res) => {
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

router.put('/:bookId/confirm', (req, res) => {
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

router.put('/:bookId/approve', (req, res) => {
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


router.put('/update-favourite', (req, res) => {
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

router.put('/update-abandoned', (req, res) => {
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

router.post('/upload-cover', upload.single('cover'), (req, res) => {
    if (req.file) {
        res.json({ fileName: req.file.filename });
    } else {
        res.status(400).json({ error: 'Image upload failed' });
    }
});

module.exports = router;
