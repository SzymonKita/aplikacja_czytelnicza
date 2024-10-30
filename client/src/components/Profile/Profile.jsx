import Navigation from '../Navigation/Navigation.jsx'
import FriendCard from '../FriendCard.jsx'
import ProfileInfo from './ProfileInfo.jsx'
import Book from '../Book.jsx'
import Achievement from './Achievement.jsx'
import "./Profile.css"

const Profile = () => {
    return (
        <>
            <Navigation title="Profil"/>
            <div className='container'>
                <div className='content'>
                    <ProfileInfo />
                    <div className='box'>
                        <h3>Ulubione książki</h3>
                        <div className='favouriteBooks'>
                            <Book title='Book1' author='Author Author' />
                            <Book title='Book2' author='Tom Smith' />
                            <Book title='Book2' author='Tom Smith' />
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