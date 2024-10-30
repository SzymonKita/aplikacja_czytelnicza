// src/components/Login.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState(''); // Użyj loginu zamiast emaila
  const [password, setPassword] = useState('');
  const { login: setLoginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logowanie użytkownika
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }), // Zmiana na login
    });

    if (response.ok) {
      const data = await response.json();
      setLoginContext(data.token); // Ustaw token w kontekście
      navigate('/MainPage'); // Przekierowanie
    } else {
      const errorData = await response.json();
      alert(errorData.error || 'Błąd logowania'); // Wyświetlenie błędu
    }
  };

  return (
    <div>
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login" // Użyj loginu
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło" // Użyj hasła
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
};

export default Login;
