import Navigation from '../Navigation/Navigation.jsx'
import FriendCard from '../FriendCard.jsx'
import ForumCommentForm from './ForumCommentForm.jsx'
import ForumComment from './ForumComment.jsx'
import image from '../blank-profile.png'
import { useParams } from "react-router-dom"
import React, { useState, useEffect, useContext } from "react";
import './ForumPost.css'


const exampleParams = [{ id: 1, user: 'User 1', likes: 14, dislikes: 18, details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra quis nunc vitae efficitur. Donec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor malesuada odio, vel feugiat arcu dictum ut. Vestibulum elementum leo neque, in consectetur risus lobortis vitae. Ut pharetra pellentesque nisi eget lobortis. Nunc accumsan enim nec rhoncus consectetur. Praesent ultricies commodo massa. Sed viverra pharetra rutrum. Vivamus dapibus consequat ex. Proin id magna at nisl interdum maximus. Proin vitae tempus libero. Vivamus volutpat facilisis ligula, eu feugiat mauris. Proin nec erat sit amet ante convallis malesuada at nec nunc. Mauris accumsan at leo a mattis. Duis in accumsan massa. Donec egestas lectus in urna tristique, a facilisis tellus consequat. Proin id semper nibh. In gravida justo in volutpat luctus. Proin at tincidunt arcu. Mauris eleifend, nisl eget tincidunt fringilla, augue lacus aliquam nisi, eu porta metus quam id felis. Quisque aliquet odio in mi bibendum fringilla. Pellentesque laoreet, orci eleifend.' },
{ id: 2, user: 'User 2', likes: 24, dislikes: 18, details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra quis nunc vitae efficitur. Donec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor malesuada odio, vel feugiat arcu dictum ut. Vestibulum elementum leo neque, in consectetur risus lobortis vitae. Ut pharetra pellentesque nisi eget lobortis. Nunc accumsan enim nec rhoncus consectetur. Praesent ultricies commodo massa. Sed viverra pharetra rutrum. Vivamus dapibus consequat ex. Proin id magna at nisl interdum maximus. Proin vitae tempus libero. Vivamus volutpat facilisis ligula, eu feugiat mauris. Proin nec erat sit amet ante convallis malesuada at nec nunc. Mauris accumsan at leo a mattis. Duis in accumsan massa. Donec egestas lectus in urna tristique, a facilisis tellus consequat. Proin id semper nibh. In gravida justo in volutpat luctus. Proin at tincidunt arcu. Mauris eleifend, nisl eget tincidunt fringilla, augue lacus aliquam nisi, eu porta metus quam id felis. Quisque aliquet odio in mi bibendum fringilla. Pellentesque laoreet, orci eleifend.' },
{ id: 3, user: 'User 3', likes: 34, dislikes: 18, details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra quis nunc vitae efficitur. Donec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor malesuada odio, vel feugiat arcu dictum ut. Vestibulum elementum leo neque, in consectetur risus lobortis vitae. Ut pharetra pellentesque nisi eget lobortis. Nunc accumsan enim nec rhoncus consectetur. Praesent ultricies commodo massa. Sed viverra pharetra rutrum. Vivamus dapibus consequat ex. Proin id magna at nisl interdum maximus. Proin vitae tempus libero. Vivamus volutpat facilisis ligula, eu feugiat mauris. Proin nec erat sit amet ante convallis malesuada at nec nunc. Mauris accumsan at leo a mattis. Duis in accumsan massa. Donec egestas lectus in urna tristique, a facilisis tellus consequat. Proin id semper nibh. In gravida justo in volutpat luctus. Proin at tincidunt arcu. Mauris eleifend, nisl eget tincidunt fringilla, augue lacus aliquam nisi, eu porta metus quam id felis. Quisque aliquet odio in mi bibendum fringilla. Pellentesque laoreet, orci eleifend.' }
]

const ForumPost = (params) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [errorPost, setErrorPost] = useState(null);
    const [comments, setComments] =useState(null);

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
                setErrorPost(error.message);
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
                        data.error || "Błąd podczas pobierania danych o wpisie na forum"
                    );
                }
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            }
        };

        fetchComments();
        fetchPost();
    }, [id]);

    if (errorPost) {
        return <Navigation title="Błąd" />;
    }

    if (!post) {
        return <Navigation title="Ładowanie wpisu..." />;
    }

    if(!comments){
        return <Navigation title="Ładowanie komentarzy do wpisu..." />;
    }

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
                                👍︎{post.likes} 👎︎{post.dislikes}
                            </div>
                        </div>
                        <p className='forumPostDetail'>
                            {post.Detail}
                        </p>
                    </div>
                    Komentarze:
                    <ForumCommentForm />
                    {comments.map((params) => (
                        <ForumComment id={params.ID} user={params.Author} likes="123" dislikes="123" details={params.Detail} />
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