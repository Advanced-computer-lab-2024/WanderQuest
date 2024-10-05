"use client";

import React, { useEffect, useState } from 'react';
import styles from '../styles/museum.css';
const Museums = () => {
    const [museums, setMuseums] = useState([]);

    useEffect(() => {
        fetch('http://localhost:7000/museum')
            .then(res => res.json())
            .then(data => setMuseums(data))
            .catch(error => {
                console.error('Error fetching data:', error);
                setMuseums([]);
            });
    }, []);

    return (
        <div className='container'>
            <div className={styles.museumsearchcom}>
            <input className={styles.museumsearch}type="text"placeholder='Enter your text' />
            <button className={styles.museumsearchbtn}>Search</button>
            </div>
            {museums.map((museum) => (
                <div className='museum-card' key={museum.id}>
                    <h2 className='museum-name'>{museum.name}</h2>
                    <p className='museum-description'>{museum.description}</p>
                    <div className='museum-pictures'>
                        {museum.pictures.map((pic, index) => (
                            <img key={index} src={pic} alt="Museum" className='museum-image' />
                        ))}
                    </div>
                    <p className='museum-location'>{museum.location.address}</p>
                    <div className='opening-hours'>
                        <h3>Opening Hours:</h3>
                        {Object.entries(museum.opening_hours).map(([day, hour]) => (
                            <div key={day}>
                                <p>{day}: {hour}</p>
                            </div>
                        ))}
                    </div>
                    <div className='ticket-prices'>
                        <h3>Ticket Prices:</h3>
                        {Object.entries(museum.ticket_prices).map(([cat, price]) => (
                            <div key={cat}>
                                <p>{cat}: ${price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Museums;
