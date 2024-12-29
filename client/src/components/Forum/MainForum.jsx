import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../Navigation/Navigation.jsx';
import FriendCard from '../FriendCard.jsx';
import MainForumCard from './MainForumCard.jsx';
import './MainForum.css';

const MainForum = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/forum/posts')
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania danych:', error);
            });
    }, []);

    return (
        <>
            <Navigation title="Forum" />
            <div className='container'>
                <div className='content'>
                    {posts.map((post) => (
                        <MainForumCard
                            key={post.ID}
                            id={post.ID}
                            title={post.Title}
                            author={post.author || 'Anonim'}
                            text={post.Detail || ''}
                            likes={post.likes}
                            dislikes={post.dislikes}
                            comments={post.comments}
                        />
                    ))}
                </div>
                <div className='friendsList'>
                    <FriendCard name='Kolega123' active={true} />
                    <FriendCard name='Ktoś987' active={false} />
                </div>
            </div>
        </>
    );
};

export default MainForum;
