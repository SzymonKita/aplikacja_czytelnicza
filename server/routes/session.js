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
    const sessionDurationMinutes = (new Date(timeEnd) - new Date(timeStart)) / 60000;

    const insertQuery = `
        UPDATE Session
        SET PagesRead = ?, TimeEnd = ?
        WHERE ID = (
        SELECT MAX(ID) FROM Session WHERE BookshelfID = ?
        );
    `;

    const updateBookshelfQuery = `
        UPDATE Bookshelf
        SET CustomPages = CustomPages + ?
        WHERE ID = ?
    `;

    const updateStatisticsQuery = `
        UPDATE statistics
        SET ReadingSpeed = 
            CASE WHEN TotalTime + ? > 0 THEN 
                (ReadingSpeed * TotalTime + ? / ?) / (TotalTime + ?)
            ELSE 
                ? / ?
            END,
            TotalTime = TotalTime + ?
        WHERE UserID = (
            SELECT UserID FROM Bookshelf WHERE ID = ?
        );
    `;

    db.beginTransaction((err) => {
        if (err) {
            console.error('Błąd rozpoczęcia transakcji:', err);
            return res.status(500).json({ error: 'Błąd zakończenia sesji' });
        }

        db.query(insertQuery, [pagesRead, timeEndFormatted, bookshelfID], (err) => {
            if (err) {
                return db.rollback(() => {
                    console.error('Błąd aktualizacji sesji:', err);
                    res.status(500).json({ error: 'Nie udało się zaktualizować sesji' });
                });
            }

            db.query(updateBookshelfQuery, [pagesRead, bookshelfID], (err) => {
                if (err) {
                    return db.rollback(() => {
                        console.error('Błąd aktualizacji postępu:', err);
                        res.status(500).json({ error: 'Nie udało się zaktualizować postępu' });
                    });
                }

                const readingSpeed = sessionDurationMinutes > 0 ? pagesRead / sessionDurationMinutes : 0;

                db.query(
                    updateStatisticsQuery,
                    [
                        sessionDurationMinutes, // + czas sesji do TotalTime
                        pagesRead, // liczba stron z sesji
                        sessionDurationMinutes, // czas trwania sesji w minutach
                        sessionDurationMinutes, // czas sesji do TotalTime
                        pagesRead, // jeśli to pierwsza sesja: liczba stron z sesji
                        sessionDurationMinutes, // jeśli to pierwsza sesja: czas sesji w minutach
                        sessionDurationMinutes, // + czas sesji do TotalTime
                        bookshelfID, // ID półki, aby znaleźć odpowiedni UserID
                    ],
                    (err) => {
                        if (err) {
                            return db.rollback(() => {
                                console.error('Błąd aktualizacji statystyk:', err);
                                res.status(500).json({ error: 'Nie udało się zaktualizować statystyk' });
                            });
                        }

                        db.commit((err) => {
                            if (err) {
                                return db.rollback(() => {
                                    console.error('Błąd zatwierdzania transakcji:', err);
                                    res.status(500).json({ error: 'Błąd zakończenia sesji' });
                                });
                            }

                            res.status(200).json({ message: 'Sesja została zakończona pomyślnie, statystyki zaktualizowane' });
                        });
                    }
                );
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

router.get('/statistics', (req, res) => {
    const query = `
        SELECT 
            s.ID as id,
            s.UserID as userId,
            u.login as name,
            s.ReadingSpeed as readingSpeed,
            s.TotalTime as totalTime
        FROM Statistics s
        JOIN User u ON s.UserID = u.ID
        ORDER BY s.ReadingSpeed DESC, s.TotalTime DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Błąd podczas pobierania statystyk:', err);
            return res.status(500).json({ error: 'Nie udało się pobrać statystyk' });
        }

        res.status(200).json(results);
    });
});


module.exports = router;
