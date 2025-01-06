const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/:userID", async (req, res) => {
  const userID = req.params.userID;
  const query = `
        SELECT 
    u.ID, 
    u.login AS Name, 
    s.ReadingSpeed, 
    ROUND(s.TotalTime,2) AS TotalTime, 
    COUNT(b.ID) AS FinishedBooks,
    s.TotalPagesRead
FROM 
    user AS u 
JOIN 
    statistics AS s 
ON 
    u.ID = s.UserID
LEFT JOIN 
    bookshelf AS b 
ON 
    u.ID = b.UserID AND b.finished = 1
WHERE 
    u.ID = ?
;
    `;
  db.query(query, [userID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Błąd podczas pobierania danych");
    }
    res.json(results);
  });
});

module.exports = router;
