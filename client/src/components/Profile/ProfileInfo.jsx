import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import image from "./blank-profile.png";
import { useNavigate } from "react-router-dom";

const ProfileInfo = ({ username, stats }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profileInfo">
      <p className="avatar">
        <img className="profilPicture" src={image} alt="Avatar" />✎ Zmień awatar
      </p>
      <p className="stats">
        <h2>{username}</h2>
        <h3>Statystyki</h3>
        Ilość przeczytanych stron: {stats.TotalPagesRead}
        <br />
        Ilość przeczytanych książek: {stats.FinishedBooks}
        <br />
        Ilość minut spędzonych na czytaniu: {stats.TotalTime}
        <br />
      </p>
      <button type="button" className="logout" onClick={handleLogout}>
        Wyloguj
      </button>
    </div>
  );
};

export default ProfileInfo;
