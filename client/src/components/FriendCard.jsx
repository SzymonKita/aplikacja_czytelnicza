const FriendCard = (props) => {
    const color = props.active ? 'green' : 'red';
    const status = props.active ? 'Dostępny' : 'Niedostępny';
    return(
        <div className='friend'>
            <span className='friendProfilPicture' style={{background: color}}></span>
            <div className='friendInfo'>
                <p>{props.name}</p>
                <p>{status}</p>
            </div>
        </div>
    )
}

export default FriendCard