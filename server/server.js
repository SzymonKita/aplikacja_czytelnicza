const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint do rejestracji
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Logika rejestracji (np. zapisywanie do bazy danych)
  console.log(`Zarejestrowano użytkownika: ${email}`);
  res.status(201).json({ message: 'Użytkownik zarejestrowany' });
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
