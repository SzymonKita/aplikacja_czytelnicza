import React, { useState, useEffect, useContext } from 'react';
import Navigation from '../Navigation/Navigation.jsx';
import FriendCard from '../FriendCard.jsx';
import ProfileInfo from './ProfileInfo.jsx';
import Book from '../Book.jsx';
import Achievement from './Achievement.jsx';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import "./Profile.css";

const Profile = () => {
  const [bookshelf, setBookshelf] = useState([]);
  const [userData, setUserData] = useState(null);
  const { userID } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userID) {
        try {
          const response = await axios.get(`http://localhost:5000/profile/${userID}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    const fetchBookshelf = async () => {
      if (userID) {
        try {
          const response = await axios.get(`http://localhost:5000/bookshelf/Favourite/${userID}`);
          setBookshelf(response.data);
        } catch (error) {
          console.error('Error fetching bookshelf:', error);
        }
      }
    };

    fetchUserData();
    fetchBookshelf();
  }, [userID]);

  return (
    <>
      <Navigation title="Profil" />
      <div className='container'>
        <div className='content'>
          {userData ? (
            <ProfileInfo 
              username={userData[0].Name} 
              stats={{
                ReadingSpeed: userData[0].ReadingSpeed,
                TotalTime: userData[0].TotalTime,
              }} 
            />
          ) : (
            <p>Ładowanie danych użytkownika...</p>
          )}
          <div className='box'>
            <h3>Ulubione książki</h3>
            <div className='favouriteBooks'>
              {bookshelf.length > 0 ? (
                bookshelf.map((book) => (
                  <Book
                    key={book.ID}
                    id={book.ID}
                    title={book.Title}
                    author={`${book.AuthorFirstName} ${book.AuthorLastName}`}
                    cover={book.Cover}
                    coverClass="small-cover"
                  />
                ))
              ) : (
                <p>Brak ulubionych książek w biblioteczce.</p>
              )}
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
          <FriendCard name='Kolega123' active={true} />
          <FriendCard name='Ktoś987' active={false} />
        </div>
      </div>
    </>
  );
};

export default Profile;
