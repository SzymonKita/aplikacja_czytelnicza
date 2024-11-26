import { Link } from "react-router-dom"
const RightGroup = (props) => {
    // TODO: Dodać sprawdzanie czy zalogoway użytkownik posiada uprawnienia admina
    const isAdmin = true;
    if(isAdmin){
        return(
            <>
                <Link to='/acceptBook'><button type="button">Akceptacja książek</button></Link>
                <Link to='/bookshelf'><button type="button">Biblioteczka</button></Link>
                <Link to='/profile'><button type="button" id="test">Profil</button></Link>
            </>
        )
    }
    if (props.isLoggedIn) {
        return (
            <>
                <Link to='/bookshelf'><button type="button">Biblioteczka</button></Link>
                <Link to='/profile'><button type="button" id="test">Profil</button></Link>
            </>)
    } else {
        return (<Link to='/login'><button type="button">Zaloguj</button></Link>)
    }
}

export default RightGroup