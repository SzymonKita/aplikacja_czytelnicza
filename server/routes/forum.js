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

router.get('/post/reactions/:PostId/:UserId', (req, res) => {
    const postId = req.params.PostId;
    const userId = req.params.UserId;
    const query = `
        SELECT Reaction
        FROM postreactions
        WHERE PostID = ? AND UserID = ?
    `
    db.query(query, [postId, userId], (err, result) => {
        if (err) {
            console.error('Błąd podczas pobierania danych o reakcjach do wpisiu:', err);
            return res.status(500).json({ error: 'Błąd podczas pobierania danych o reakcjach do wpisiu' });
        }
        res.status(200).json(result);
    })
})

router.post('/post/react/:PostId/:UserId/:UserReaction', async (req, res) => {
    const postId = req.params.PostId;
    const userId = req.params.UserId;
    const userReaction = req.params.UserReaction;
    var reaction, message;
    const query = `
        SELECT Reaction
        FROM postreactions
        WHERE PostID = ? AND UserID = ?
    `
    db.query(query, [postId, userId], (err, result) => {
        if (err) {
            console.error('Błąd podczas pobierania danych o reakcjach do wpisiu:', err);
            return res.status(500).json({ error: 'Błąd podczas pobierania danych o reakcjach do wpisiu' });
        }
        if (result.length > 0)
            reaction = result[0].Reaction
        else
            reaction = "None"
    })
    if (reaction === userReaction) {
        return res.status(200).json({ message: "Wpis już dostał taką reakcję" })
    }
    else if (reaction != "None") {
        const removeQuerry = `
            DELETE FROM postreactions
            WHERE PostID = ? AND UserID = ?;
        `
        db.query(removeQuerry, [postId, userId], (err, result) => {
            if (err) {
                console.error('Błąd podczas usuwania aktualnej reakcji na wpisie na wpisie:', err);
                return res.status(500).json({ error: 'Błąd podczas usuwania aktualnej reakcji na wpisie na wpisie' });
            }
        })

        
    }

    const insertQuerry = `
        INSERT INTO postreactions (PostID, UserID, Reaction)
        VALUES (?, ?, ?)
    `
    db.query(insertQuerry, [postId, userId, userReaction], (err, result) => {
        if (err) {
            console.error('Błąd podczas pobierania danych o reakcjach do wpisiu:', err);
            return res.status(500).json({ error: 'Błąd podczas pobierania danych o reakcjach do wpisiu' });
        }
    })

    const updateQuerry = `
        UPDATE Post p
        LEFT JOIN (
            SELECT 
                PostID,
                COUNT(CASE WHEN Reaction = 'Like' THEN 1 END) AS LikeCount,
                COUNT(CASE WHEN Reaction = 'Dislike' THEN 1 END) AS DislikeCount
            FROM PostReactions
            WHERE PostID = ?
            GROUP BY PostID
        ) sub ON p.ID = sub.PostID
        SET p.Likes = IFNULL(sub.LikeCount, 0),
            p.Dislikes = IFNULL(sub.DislikeCount, 0)
        WHERE p.ID = sub.PostID;
    `
    db.query(updateQuerry, [postId], (err, result) => {
        if (err) {
            console.error('Błąd podczas aktualizacji danych o reakcjach do wpisiu:', err);
            return res.status(500).json({ error: 'Błąd podczas aktualizacji danych o reakcjach do wpisiu' });
        }
    })
    return res.status(200).json({message: `Dodano reakcję ${userReaction}`, postId, userId});
})

module.exports = router;
