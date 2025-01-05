const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const bookshelfRoutes = require('./routes/bookshelf');
const sessionRoutes = require('./routes/session');
const forumRoutes = require('./routes/forum');
const profileRoutes = require('./routes/profile')
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/covers', express.static(path.join(__dirname, 'covers')));

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/bookshelf', bookshelfRoutes);
app.use('/session', sessionRoutes);
app.use('/forum', forumRoutes);
app.use('/profile', profileRoutes);

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

module.exports = app;
