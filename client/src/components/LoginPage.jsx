import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation/Navigation.jsx'
import FriendCard from './FriendCard.jsx'

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { login: setLoginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setLoginContext(data.token, data.user.id, data.user.admin);
      navigate('/');
    } else {
      const errorData = await response.json();
      alert(errorData.error || 'Login error');
    }
  };

  return (
    <>
      <Navigation title="Strona główna" isLoggedIn={false} />
      <div className='container'>
        <div className='content'>
          <div>
            <h2>Logowanie</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Zaloguj</button>
            </form>
          </div>
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
