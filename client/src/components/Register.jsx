// src/components/Register.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Upewnij się, że kontekst jest poprawnie zaimportowany

const Register = () => {
  const [login, setLogin] = useState(''); // Dodaj stan dla loginu
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: setLoginContext } = useContext(AuthContext); // Użycie kontekstu

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login || !email || !password || !confirmPassword) {
      setError('Wszystkie pola są wymagane');
      return;
    }

    if (password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków');
      return;
    }

    if (password !== confirmPassword) {
      setError('Hasła nie pasują');
      return;
    }

    setLoading(true);
    setError('');

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, email, password }), // Wysłanie loginu, e-maila i hasła
    });

    setLoading(false);

    if (response.ok) {
      const { message } = await response.json();
      alert(message); // Możesz pokazać komunikat o sukcesie
      navigate('/login'); // Po rejestracji, przekierowanie do logowania
    } else {
      const errorMessage = await response.json();
      setError(errorMessage.error || 'Błąd rejestracji');
    }
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Potwierdź hasło"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Ładowanie...' : 'Zarejestruj'}
        </button>
      </form>
    </div>
  );
};

export default Register;
