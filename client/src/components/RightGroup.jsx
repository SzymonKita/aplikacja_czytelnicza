const RightGroup = (props) =>{
    if(props.isLoggedIn){
        return(<><button type="button">Biblioteczka</button><button type="button" id="test">Profil</button></>)
    }else{
        return(<button type="button">Zaloguj</button>)
    }
}

export default RightGroup