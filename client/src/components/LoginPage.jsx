import Navigation from './Navigation.jsx'
import FriendCard from './FriendCard.jsx'

const MainPage = () => {
    return (
        <>
            <Navigation title="Strona główna" isLoggedIn={false} />
            <div className='container'>
                <div className='content'>
                    <form>
                        <p>
                            <input type="email" placeholder="Email"/> <br/>
                            <input type="password" placeholder="Password"/> <br/>
                            <button type='submit'>Zaloguj</button>
                        </p>
                    </form>
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    )
}

export default MainPage