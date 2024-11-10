"use client";
import React, { useState } from 'react';
import AddRating from './AddRating';
import AddComment from './AddComment';
import styles from '/Styles/BasicContainer.module.css';


//this file serves as a testing tool for the comment and rating components
//feel free to copy from this file when using any of the components
//the css file is called "BasicContainer.module.css"

const RatingContainer = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    

    const handleSubmition = async (e) => {
        e.preventDefault();
        
        try {
            const rateResponse = await fetch(`/api/activities/${someID}/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating }),
            });

            const commResponse = await fetch(`/api/activities/${someID}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment }),
            });

            // Handle responses
            if (rateResponse.ok && commResponse.ok) {
                console.log('Rating and Comment submitted successfully');
            } else {
                console.error('Failed to submit rating or comment');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }

        console.log('Rating:', rating);
        console.log('Comment:', comment);
    };

    return (

        <div className={styles.container}>
            <AddRating rating={rating} setRating={setRating} />
            <AddComment comment={comment} setComment={setComment} />
            <button className={styles.button} onClick={handleSubmition}>Submit</button>

        </div>
    );
};

export default RatingContainer;
