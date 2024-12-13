const express = require('express');
const db = require('../db');
const router = express.Router();
const { formatTimestamp } = require('../utils');

router.get('/current/:userID', (req, res) => {
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




router.post('/', (req, res) => {
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



router.post('/start', (req, res) => {
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


router.put('/end/:sessionID', (req, res) => {
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

router.get('/check/:bookshelfID', (req, res) => {
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

module.exports = router;
