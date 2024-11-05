"use client";
import React, { useState } from 'react';

const AddRating = ({ rating, setRating }) => {
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleRating = (value) => setRating(value);
    const handleMouseEnter = (value) => setHoveredRating(value);
    const handleMouseLeave = () => setHoveredRating(0);

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <span 
                    key={star}
                    style={{ cursor: 'pointer', color: star <= (hoveredRating || rating) ? 'gold' : 'gray', fontSize: '2rem'}}
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default AddRating;
