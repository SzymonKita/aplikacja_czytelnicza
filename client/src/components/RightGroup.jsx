// src/components/RightGroup.jsx
import { Link } from "react-router-dom";

const RightGroup = (props) => {
  if (props.isLoggedIn) {
    return (
      <>
        <button type="button">Biblioteczka</button>
        <button type="button" id="test">Profil</button>
      </>
    );
  } else {
    return (
      <>
        <Link to='/login'>
          <button type="button">Zaloguj</button>
        </Link>
        <Link to='/register'>
          <button type="button">Rejestracja</button>
        </Link>
      </>
    );
  }
};

export default RightGroup;
