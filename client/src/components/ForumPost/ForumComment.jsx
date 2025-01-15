import image from '../blank-profile.png'
import { AuthContext } from "../../AuthContext";
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
const ForumComment = ({id, user, likes, dislikes, details}) => {
    const { userID, isLoggedIn } = useContext(AuthContext);
    const [reaction, setReaction] = useState(null);
    const [commentLikes, setCommentLikes] = useState(likes)
    const [commentDislikes, setCommentDislikes] = useState(dislikes)
    const checkReaction = async () => {
        try {
            const reactionData = {commentId: id, userId: userID}
            const queryString = new URLSearchParams(reactionData).toString();
            const response = await fetch(`http://localhost:5000/forum/comment/reactions?${queryString}`);
            const data = await response.json();

            if (data.length > 0)
                setReaction(data[0].Reaction);
            else
                setReaction("None")
        } catch (error) {
            console.error(error.message);
        }
    }


    const toggleLike = async () => {
        if (isLoggedIn) {
            try {
                const reactionData = {commentId: id, userId: userID, userReaction: "Like"}
                const queryString = new URLSearchParams(reactionData).toString();
                const response = await axios.post(`http://localhost:5000/forum/comment/react?${queryString}`);
                console.log('Pozytywna reakcja dodana do komentarza:', response.data);
            } catch (error) {
                console.error('Wystąpił błąd dodawania pozytywnej reakcji do komentarza:', error);
                alert("Wystąpił błąd dodawania pozytywnej reakcji do komentarza.");
            }
            if (reaction === "Dislike") {
                console.log("zmiana dislike")
                setCommentDislikes(commentDislikes-1)
                setCommentLikes(commentLikes+1)
            }
            if (reaction === "None") {
                setCommentLikes(commentLikes+1)
            }
            setReaction("Like");
        }
    }

    const toggleDislike = async () => {
        if (isLoggedIn) {
            try {
                const reactionData = {commentId: id, userId: userID, userReaction: "Dislike"}
                const queryString = new URLSearchParams(reactionData).toString();
                const response = await axios.post(`http://localhost:5000/forum/comment/react?${queryString}`);
                console.log('Negatywna reakcja dodana do komentarza:', response.data);
            } catch (error) {
                console.error('Wystąpił błąd dodawania negatywnej reakcji do komentarza:', error);
                alert("Wystąpił błąd dodawania negatywnej reakcji do komentarza.");
            }
            if (reaction === "Like") {
                setCommentLikes(commentLikes-1)
                setCommentDislikes(commentDislikes+1)
            }
            if (reaction === "None") {
                setCommentDislikes(commentDislikes+1)
            }
            setReaction("Dislike");
        }
    }

    checkReaction();
    return (
        <div className='forumPost' style={{backgroundColor:'#96EFFF'}}>
            <div className='forumPostHeader'>
                <div className='forumPostUser'>
                    <img className='rankingPicture' src={image} />
                    <b>{user}</b>
                </div>
                <div>
                    <button type='button' className='reactionButton' onClick={() => toggleLike()} style={{ color: reaction === "Like" ? "green" : "initial"}}>👍︎</button>{commentLikes}
                    <button type='button' className='reactionButton' onClick={() => toggleDislike()} style={{ color: reaction === "Dislike" ? "red" : "initial"}}>👎︎</button>{commentDislikes}
                </div>
            </div>
            <p className='forumPostDetail'>
                {details}
            </p>
        </div>
    )
}

export default ForumComment