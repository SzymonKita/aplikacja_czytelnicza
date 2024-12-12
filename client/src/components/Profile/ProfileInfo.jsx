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
                <h2>EpicReader</h2>
                <h3>Statystyki</h3>
                Ilość przeczytanych stron : 2345<br />
                Ilość przeczytanych książek : 4<br />
                Ilość minut spędzonych na czytaniu : 1000<br />
            </p>
            <button type='button' className='logout' onClick={handleLogout}>Wyloguj</button>
        </div>
    );
};

export default ProfileInfo;
