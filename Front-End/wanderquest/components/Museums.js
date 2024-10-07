"use client";

import React, { useEffect, useState } from 'react';
import styles from '../styles/museum.css';

const Museums = () => {
    const Tags = ["Travel", "Adventure", "History", "Culture", "Food", "Nature"];
    const [museums, setMuseums] = useState([]);
    const [filteredtags, setFilteredtags] = useState([]);
    const [filteredmuseums, setFilteredmuseums] = useState([]);
    const [search, setSearch] = useState('');

    const handlesearch = () => {
        const newprod = museums.filter((prod) => {
            return search.toLowerCase() === '' || 
                   prod.name.toLowerCase().includes(search.toLowerCase()) || 
                   prod.cat.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredmuseums(newprod);  // Set the filtered museums based on search
    };

    const handlefilter = (tag) => {
        if (filteredtags.includes(tag)) {
            const temp = filteredtags.filter(t => t !== tag);
            setFilteredtags(temp);
        } else {
            setFilteredtags([...filteredtags, tag]);
        }
    };

    const filtertags = () => {
        if (filteredtags.length > 0) {
            const tempmu = museums.filter(museum => 
                filteredtags.every(tag => museum.tags.includes(tag))  // Fix: Check if museum includes all selected tags
            );
            setFilteredmuseums(tempmu);
        } else {
            setFilteredmuseums([...museums]);  // If no tag selected, show all museums
        }
    };

    useEffect(() => {
        filtertags();
    }, [filteredtags]);

    useEffect(() => {
        fetch('http://localhost:7000/museum')
            .then(res => res.json())
            .then(data => {
                setMuseums(data);
                setFilteredmuseums(data);  // Set both state values at the start
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setMuseums([]);
            });
    }, []);

    return (
        <div className='container'>
            {Tags.map((tag, index) => (
                <div key={index}>
                   <label htmlFor="">{tag}</label> <input type="checkbox"onClick={() => handlefilter(tag)}></input>
                </div>
            ))}
            <div className={styles.museumsearchcom}>
                <input className={styles.museumsearch} 
                       onChange={(e) => setSearch(e.target.value)} 
                       type="text" 
                       placeholder='Enter your text' />
                <button className={styles.museumsearchbtn} onClick={handlesearch}>Search</button>
            </div>
            {filteredmuseums.map((museum) => (
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
