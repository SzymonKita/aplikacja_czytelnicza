import Navigation from '../Navigation/Navigation.jsx'
import FriendCard from '../FriendCard.jsx'
import ForumCommentForm from './ForumCommentForm.jsx'
import ForumComment from './ForumComment.jsx'
import image from '../blank-profile.png'
import { useParams } from "react-router-dom"
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import axios from 'axios';
import './ForumPost.css'

const ForumPost = (params) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState(null);
    const [reaction, setReaction] = useState(null);
    const { userID, isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/forum/post/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setPost(data);
                } else {
                    throw new Error(
                        data.error || "Błąd podczas pobierania danych o wpisie na forum"
                    );
                }
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            }
        };
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:5000/forum/post/comments/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setComments(data);
                } else {
                    throw new Error(
                        data.error || "Błąd podczas pobierania danych o komentarzach do wpisiu na forum"
                    );
                }
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            }
        };

        fetchPost();
        fetchComments();
    }, [id]);

    if (error) {
        return <Navigation title="Błąd" />;
    }

    if (!post) {
        return <Navigation title="Ładowanie wpisu..." />;
    }

    if (!comments) {
        return <Navigation title="Ładowanie komentarzy do wpisu..." />;
    }

    const checkReaction = async () => {
        try {
            const reactionData = {postId: id, userId: userID}
            const queryString = new URLSearchParams(reactionData).toString();
            const response = await fetch(`http://localhost:5000/forum/posts/reactions?${queryString}`);
            const data = await response.json();
            console.log("Udało się pobrać", data, reactionData)

            if (data.length > 0)
                setReaction(data[0].Reaction);
            else
                setReaction("None")
        } catch (err) {
            console.log("Błąd pobierania")
            console.error(err.message);
        }

    }

    const toggleLike = async () => {
        if (isLoggedIn) {
            try {
                const reactionData = {postId: id, userId: userID, userReaction: "Like"}
                const queryString = new URLSearchParams(reactionData).toString();
                const response = await axios.post(`http://localhost:5000/forum/post/react?${queryString}`);
                console.log('Pozytywna reakcja dodana do posta:', response.data);
            } catch (error) {
                console.error('Wystąpił błąd dodawania pozytywnej reakcji do posta:', error);
                alert("Wystąpił błąd dodawania pozytywnej reakcji do posta.");
            }
            if (reaction === "Dislike") {
                setPost(
                    {
                        Author: post.Author,
                        Detail: post.Detail,
                        ID: post.ID,
                        Title: post.Title,
                        comments: post.comments,
                        dislikes: post.dislikes - 1,
                        likes: post.likes + 1
                    }
                )
            }
            if (reaction === "None") {
                setPost(
                    {
                        Author: post.Author,
                        Detail: post.Detail,
                        ID: post.ID,
                        Title: post.Title,
                        comments: post.comments,
                        dislikes: post.dislikes,
                        likes: post.likes + 1
                    }
                )
            }
            setReaction("Like");
        }
    }

    const toggleDislike = async () => {
        if (isLoggedIn) {
            try {
                const reactionData = {postId: id, userId: userID, userReaction: "Like"}
                const queryString = new URLSearchParams(reactionData).toString();
                const response = await axios.post(`http://localhost:5000/forum/post/react?${queryString}`);
                console.log('Negatywna reakcja dodana do posta:', response.data);
            } catch (error) {
                console.error('Wystąpił błąd dodawania negatywnej reakcji do posta:', error);
                alert("Wystąpił błąd dodawania negatywnej reakcji do posta.");
            }
            if (reaction === "Like") {
                setPost(
                    {
                        Author: post.Author,
                        Detail: post.Detail,
                        ID: post.ID,
                        Title: post.Title,
                        comments: 30,
                        dislikes: post.dislikes + 1,
                        likes: post.likes - 1
                    }
                )
            }
            if (reaction === "None") {
                setPost(
                    {
                        Author: post.Author,
                        Detail: post.Detail,
                        ID: post.ID,
                        Title: post.Title,
                        comments: 30,
                        dislikes: post.dislikes + 1,
                        likes: post.likes
                    }
                )
            }
            setReaction("Dislike");
        }
    }

    checkReaction();

    return (
        <>
            <Navigation title="Forum tytuł wpisu" />
            <div className='container'>
                <div className='content'>
                    <div className='forumPost'>
                        <div className='forumPostHeader'>
                            <div className='forumPostUser'>
                                <img className='rankingPicture' src={image} />
                                <b>{post.author}</b>
                            </div>
                            <div>
                                <button type='button' className='reactionButton' onClick={() => toggleLike()} style={{ color: reaction === "Like" ? "green" : "initial"}}>👍︎</button>{post.likes}
                                <button type='button' className='reactionButton' onClick={() => toggleDislike()} style={{ color: reaction === "Dislike" ? "red" : "initial"}}>👎︎</button>{post.dislikes}
                            </div>
                        </div>
                        <p className='forumPostDetail'>
                            {post.Detail}
                        </p>
                    </div>
                    Komentarze:
                    <ForumCommentForm postId={id}/>
                    {comments.map((params) => (
                        <ForumComment id={params.ID} user={params.Author} likes={params.likes} dislikes={params.dislikes} details={params.Detail} />
                    ))}

                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    )
}

export default ForumPost