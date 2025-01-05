const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/:userID', async (req, res) => {
    const userID = req.params.userID;
    const query = `
        SELECT u.ID, u.login AS Name, s.ReadingSpeed, s.TotalTime 
            FROM user AS u JOIN statistics AS s ON u.ID = s.UserID
            WHERE u.ID = ?;
    `;
    db.query(query,[userID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Błąd podczas pobierania danych');
        }
        res.json(results);
    });
});

module.exports = router;
