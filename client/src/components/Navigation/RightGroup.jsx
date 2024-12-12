import { Link } from "react-router-dom";

const RightGroup = ({ isLoggedIn, isAdmin }) => {
    if (isLoggedIn) {
        return (
            <>
                <Link to='/bookshelf'><button type="button">Biblioteczka</button></Link>
                <Link to='/profile'><button type="button" id="test">Profil</button></Link>
                {isAdmin === 1 && <Link to='/acceptBook'><button type="button">Akceptacja książek</button></Link>}
            </>
        );
    } else {
        return (
            <>
                <Link to='/login'><button type="button">Zaloguj</button></Link>
                <Link to='/register'><button type="button">Zarejestruj</button></Link>
            </>
        );
    }
};

export default RightGroup;
