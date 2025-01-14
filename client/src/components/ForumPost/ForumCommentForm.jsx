import React, { useState } from 'react';

const ForumCommentForm = () => {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Dodać zapis do bazy danych
    };

    return(
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