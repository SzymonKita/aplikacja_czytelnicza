import React, { useState } from 'react';

const StarRating = () => {
    const [hovered, setHovered] = useState(null);
    const [selected, setSelected] = useState(null);

    const handleMouseEnter = (index) => {
        setHovered(index);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    const handleClick = (index) => {
        setSelected(index);
    };

    return (
        <div style={{ display: 'flex', cursor: 'pointer' }}>
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(index)}
                    style={{
                        color: index <= (hovered ?? selected) ? 'gold' : 'gray',
                        fontSize: '2rem',
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
