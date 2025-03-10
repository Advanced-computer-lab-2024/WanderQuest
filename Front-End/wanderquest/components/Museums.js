"use client";

import React, { useEffect, useState } from 'react';
import styles from '../styles/museum.css';

const Museums = (Props) => {
    const [Tags,setTags]=useState([]);
    const [museums, setMuseums] = useState([]);
    const [filteredtags, setFilteredtags] = useState([]);
    const [filteredmuseums, setFilteredmuseums] = useState([]);
    const [search, setSearch] = useState('');
    const role=Props.role;
    // http://localhost:4000/admin/tags

    const handlefilter = (tag) => {
        if (filteredtags.includes(tag)) {
            const temp = filteredtags.filter(t => t !== tag);
            setFilteredtags(temp);
        } else {
            setFilteredtags([...filteredtags, tag]);
        }
    };
    useEffect(() => {
        fetch('http://localhost:4000/tourismGovernor/tags')
            .then(res => res.json())
            .then(data => {
                setTags(data);
                  // Set both state values at the start
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                
            });
    }, []);
    const filtertags = () => {
        if (filteredtags.length > 0) {
            const tempmu = museums.filter(museum => 
               museum.tag && filteredtags.some(tag => museum.tags.type(tag))  // Fix: Check if museum includes all selected tags
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
        fetch('http://localhost:4000/tourist/upcomingPlaces')
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
    const handlesearch = () => {
        const newprod = museums.filter((prod) => {
            return search.toLowerCase() === '' || 
                //    prod.title.toLowerCase().includes(search.toLowerCase()) || 
                (prod.tags && prod.tags.some(tag => tag.type.toLowerCase() === search.toLowerCase()));
        });
        setFilteredmuseums(newprod);  // Set the filtered museums based on search
    };
    const clearsearch=()=>{
        setFilteredmuseums(museums);
    }
    const ClearFilters=()=>{
        setFilteredmuseums(museums);
    }
    return (
        <div className='container'>
            {Tags.map((tag, index) => (
                <div key={index}>
                   <label htmlFor="">{tag.type}</label> <input type="checkbox"onClick={() => handlefilter(tag)}></input>
                </div>
            ))}{role=== "Tourist"?(
            <div className={styles.museumsearchcom}>
                <input className={styles.museumsearch} 
                       onChange={(e) => setSearch(e.target.value)} 
                       type="text" 
                       placeholder='Enter your text' />
                <button className={styles.museumsearchbtn} onClick={handlesearch}>Search</button>
                <button onClick={clearsearch}>clearsearch</button>
                
            </div>):(<></>

            )}
            
            {filteredmuseums.map((museum) => (
                <div className='museum-card' key={museum.id}>
                    <h2 className='museum-name'>{museum.title}</h2>
                    <p className='museum-description'>{museum.description}</p>
                    <div className='museum-pictures'>
                        {/* {museum.pictures.map((pic, index) => (
                            <img key={index} src={pic} alt="Museum" className='museum-image' />
                        ))} */}
                    </div>
                    <p className='museum-location'>{museum.location}</p>
                    <div className='opening-hours'>
                        <h3>Opening Hours:</h3>
                        {museum.openingHours}
                    </div>
                    <div className='ticket-prices'>
                        <h3>Ticket Prices:</h3>
                        {museum.ticketPrices.map((cat, price) => (
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
