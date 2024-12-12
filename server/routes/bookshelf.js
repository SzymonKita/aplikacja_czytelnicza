const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', (req, res) => {
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
router.get('/:userID', (req, res) => {
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
router.get('/Favourite/:userID', (req, res) => {
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
router.patch('/:id', (req, res) => {
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
module.exports = router;
