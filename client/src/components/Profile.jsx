import Navigation from './Navigation.jsx'
import FriendCard from './FriendCard.jsx'
import ProfileInfo from './Profile/ProfileInfo.jsx'
import FavouriteBook from './Profile/FavouriteBook.jsx'
import Achievement from './Profile/Achievement.jsx'

const Profile = () => {
    return (
        <>
            <Navigation title="Profil" isLoggedIn={true} />
            <div className='container'>
                <div className='content'>
                    <ProfileInfo />
                    <div className='box'>
                        <h3>Ulubione książki</h3>
                        <div className='favouriteBooks'>
                            <FavouriteBook title='Book1' author='Author Author' />
                            <FavouriteBook title='Book2' author='Tom Smith' />
                            <FavouriteBook title='Book2' author='Tom Smith' />
                        </div>
                    </div>
                    <div className='box'>
                        <h3>Osiągnięcia</h3>
                        <div className='favouriteBooks'>
                            <Achievement />
                            <Achievement />
                        </div>
                    </div>
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    )
}

export default Profile