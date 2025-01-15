import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import axios from 'axios';

const ForumCommentForm = ({ postId }) => {
    const [feedback, setFeedback] = useState('');
    const { userID, isLoggedIn } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isLoggedIn){
            try {
                const response = await axios.post('http://localhost:5000/forum/comments', { postId, userId: userID, feedback });
                console.log(response, "Ok?", response.status);

                if (response.status == 201) {
                    alert('Comment added successfully!');
                    setFeedback(''); 
                } else {
                    alert(`Failed to add comment`);
                }
            } catch (error) {
                console.error('Error submitting comment:', error);
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='commentForm'>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows="4"
                    style={{ width: '90%', marginTop: '10px', resize: 'none' }}
                />
                <div>
                    <button type="submit" style={{ marginTop: '10px' }}>Opublikuj</button>
                </div>
            </div>
        </form>
    );
}

export default ForumCommentForm