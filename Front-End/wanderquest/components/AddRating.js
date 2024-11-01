"use client";
import React from 'react';

const AddRating = ({ rating, setRating }) => {
    const handleRating = (value) => setRating(value);

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <span 
                    key={star}
                    style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray', fontSize: '2rem'}}
                    onClick={() => handleRating(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default AddRating;
