import {Link} from "react-router-dom"
const RightGroup = (props) =>{
    if(props.isLoggedIn){
        return(
        <>
        <Link to='/bookshelf'><button type="button">Biblioteczka</button></Link>
        <Link to='/profile'><button type="button" id="test">Profil</button></Link>
        </>)
    }else{
        return(<Link to='/login'><button type="button">Zaloguj</button></Link>)
    }
}

export default RightGroup