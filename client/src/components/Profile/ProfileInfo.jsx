import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import image from './blank-profile.png';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className='profileInfo'>
            <p className='avatar'>
                <img className='profilPicture' src={image}/>
                ✎ Zmień awatar
            </p>
            <p className='stats'>
                <h2>Nazwa użytkownika</h2>
                <h3>Statystyki</h3>
                Statystyka 1 : 10000111<br />
                Statystyka 2 : 5000<br />
                Statystyka 3 : 790<br />
                Statystyka 4 : 25<br />
                Statystyka 5 : 3<br />
            </p>
            <button type='button' className='logout' onClick={handleLogout}>Wyloguj</button>
        </div>
    );
};

export default ProfileInfo;
