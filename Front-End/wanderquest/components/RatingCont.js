"use client";
import React, { useState } from 'react';
import AddRating from './AddRating';
import AddComment from './AddComment';
import styles from '/Styles/BasicContainer.module.css';

const RatingContainer = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmition = (e) => {
        e.preventDefault();
        console.log('Rating:', rating);
        console.log('Comment:', comment);
    }

    return (

        <div className='container'>
                <h2>Rating Tester</h2>
                <AddRating rating={rating} setRating={setRating} />
                <AddComment comment={comment} setComment={setComment}/>
                
                <button className={styles.button} onClick={handleSubmition}>Submit</button>
                
        </div>
    );
};

export default RatingContainer;
