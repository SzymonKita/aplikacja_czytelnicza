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

router.get('/post/:id', (req, res) => {
    const postId = req.params.id;

    const query = `
        SELECT post.ID, post.Title, user.login AS Author, post.Detail, post.likes, post.dislikes, post.comments
        FROM post
        LEFT JOIN user ON post.UserID = user.ID
        WHERE post.ID = ?;
    `;

    db.query(query, [postId], (err, result) => {
        if (err) {
            console.error('Błąd podczas pobierania danych o wpisie na forum:', err);
            return res.status(500).json({ error: 'Błąd podczas pobierania danych o wpisie na forum' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Wpis na forum nie znaleziony' });
        }

        const post = result[0];
        res.status(200).json(post);
    })
})

router.get('/post/comments/:id', (req, res) => {
    const postId = req.params.id;
    const query = `
        SELECT comments.ID, user.login AS Author, comments.Detail
        FROM comments
        LEFT JOIN user on comments.UserID = user.ID
        WHERE comments.PostID = 1
    `

    db.query(query, [postId], (err, result) => {
        if (err) {
            console.error('Błąd podczas pobierania danych o komentarzach do wpisiu:', err);
            return res.status(500).json({ error: 'Błąd podczas pobierania danych o komentarzach do wpisiu' });
        }
        res.status(200).json(result);
    })
})

module.exports = router;
