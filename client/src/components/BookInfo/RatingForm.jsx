import React, { useState } from 'react';
import StarRating from './StarRating';

const RatingForm = () => {
    const [rating, setRating] = useState(null);
    const [feedback, setFeedback] = useState('');

    const handleRatingSelect = (rating) => {
        setRating(rating);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Rating:", rating);
        console.log("Feedback:", feedback);
        // TODO: Dodać zapis do bazy danych
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="4"
                style={{ width: '90%', marginTop: '10px', resize: 'none' }}
            />
            <div>
                <StarRating onRatingSelect={handleRatingSelect} />
                <button type="submit" style={{ marginTop: '10px' }}>Opublikuj</button>
            </div>
        </form>
    );
};

export default RatingForm;