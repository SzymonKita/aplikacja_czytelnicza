import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Navigation from './Navigation/Navigation.jsx'
import FriendCard from './FriendCard.jsx'

const RegisterPage = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: setLoginContext } = useContext(AuthContext);

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

    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, email, password }),
    });

    setLoading(false);

    if (response.ok) {
      const { message } = await response.json();
      alert(message);
      navigate('/login');
    } else {
      const errorMessage = await response.json();
      setError(errorMessage.error || 'Błąd rejestracji');
    }
  };

  return (
    <>
      <Navigation title="Strona główna" isLoggedIn={false} />
      <div className='container'>
        <div className='content'>
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
        </div>
        
      </div>
    </>

  );
};

export default RegisterPage;
