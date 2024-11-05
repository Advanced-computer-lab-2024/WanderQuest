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

    const handleSubmition = (e) => {
        e.preventDefault();
        console.log('Rating:', rating);
        console.log('Comment:', comment);
    }

    return (

        <div className={styles.container}>
            <h2>Rating Tester</h2>
            <AddRating rating={rating} setRating={setRating} />
            <AddComment comment={comment} setComment={setComment} />
            <button className={styles.button} onClick={handleSubmition}>Submit</button>

        </div>
    );
};

export default RatingContainer;
