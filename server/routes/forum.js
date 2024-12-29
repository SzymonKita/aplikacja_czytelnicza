const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/posts', (req, res) => {
    const query = `
        SELECT post.ID, post.Title, user.login AS author, post.Detail, post.likes, post.dislikes, post.comments
        FROM post
        LEFT JOIN user ON post.UserID = user.ID;
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Błąd podczas pobierania danych');
        }
        res.json(results);
    });
});

module.exports = router;
