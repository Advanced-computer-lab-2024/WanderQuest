"use client";
import React, { useState } from 'react';
import AddRating from './AddRating';
import AddComment from './AddComment';

const RatingContainer = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    return (

        <div>
            <form>
                <h2>Rating Tester</h2>
            <AddComment comment={comment} setComment={setComment}/>
            <AddRating rating={rating} setRating={setRating} />
            <p>Your rating: {rating}</p>
            <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RatingContainer;
