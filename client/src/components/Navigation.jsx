// src/components/Navigation.jsx
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import RightGroup from './RightGroup';

const Navigation = (props) => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <>
      <nav>
        <div className="left-group">
          <Link to="/"><button type="button">Strona główna</button></Link>
          <button type="button">Książki</button>
          <button type="button">Forum</button>
          <button type="button">Ranking</button>
        </div>

        <div className="right-group">
          <RightGroup isLoggedIn={isLoggedIn} logout={logout} />
        </div>
      </nav>
      <h1>{props.title}</h1>
    </>
  );
};

export default Navigation;
