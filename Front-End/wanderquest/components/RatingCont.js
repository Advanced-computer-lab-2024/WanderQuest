"use client";
import React, { useState } from 'react';
import AddRating from './AddRating';
import AddComment from './AddComment';

const RatingContainer = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmition = (e) => {
        e.preventDefault();
        console.log('Rating:', rating);
        console.log('Comment:', comment);
    }

    return (

        <div>
            <form>
                <h2>Rating Tester</h2>
                <AddRating rating={rating} setRating={setRating} />
                <AddComment comment={comment} setComment={setComment}/>
                <button type="submit" onClick={handleSubmition}>Submit</button>
            </form>
        </div>
    );
};

export default RatingContainer;
