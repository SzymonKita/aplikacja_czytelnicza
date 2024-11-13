import Navigation from '../Navigation/Navigation.jsx'
import FriendCard from '../FriendCard.jsx'

const Session = () => {
    return (
        <>
            <Navigation title="Sesja czytania"/>
            <div className='container'>
                <div className='content'>
                    
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    )
}

export default Session