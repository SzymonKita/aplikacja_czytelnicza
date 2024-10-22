// src/components/LoginPage.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import FriendCard from './FriendCard';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulacja żądania do API logowania
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      login(data.token); // Zapisanie tokena
      navigate('/'); // Przekierowanie na stronę główną
    } else {
      alert('Błąd logowania');
    }
  };

  return (
    <>
      <Navigation title="Strona główna" isLoggedIn={false} />
      <div className='container'>
        <div className='content'>
          <form onSubmit={handleSubmit}>
            <p>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button type="submit">Zaloguj</button>
            </p>
          </form>
        </div>
        <div className='friendsList'>
          <FriendCard name='Friend 1' active={true} />
          <FriendCard name='Friend 2' active={false} />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
