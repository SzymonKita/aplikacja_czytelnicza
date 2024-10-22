import Navigation from './Navigation.jsx'
import FriendCard from './FriendCard.jsx'

const MainPage = () => {
    return (
        <>
            <Navigation title="Strona główna" isLoggedIn={true} />
            <div className='container'>
                <div className='content'>Tu będzie content strony</div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    )
}

export default MainPage