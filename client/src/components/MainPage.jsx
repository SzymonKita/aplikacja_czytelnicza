// src/components/MainPage.jsx
import Navigation from './Navigation';
import FriendCard from './FriendCard';

const MainPage = () => {
  return (
    <>
      <Navigation title="Strona główna" isLoggedIn={false} />
      <div className='container'>
        <div className='content'>Tu będzie content strony</div>
        <div className='friendsList'>
          <FriendCard name='Friend 1' active={true} />
          <FriendCard name='Friend 2' active={false} />
        </div>
      </div>
    </>
  );
};

export default MainPage;
