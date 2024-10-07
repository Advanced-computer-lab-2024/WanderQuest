"use client";
import styles from '../Styles/historicalplaces.module.css';
import { useState, useEffect, useRef } from 'react';

const Historicalplaces = () => {

    const [places, setPlaces] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        pictures: [],
        openingHours: '',
        ticketPrices: [],  // Initialize as empty array
        tags: [],  // Initialize as empty array
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);

    const formRef = useRef(null);

    useEffect(() => {
        // Fetch historical places from the backend
        const fetchPlaces = async () => {
            try {
                const response = await fetch('http://localhost:4000/tourismGovernor/places');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlaces(data);
            } catch (error) {
                console.error('Failed to fetch places:', error);
            }
        };
        fetchPlaces();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormData({
            ...formData,
            [name]: (name === 'ticketPrices' || name === 'tags') 
                ? value.split(',').map(item => item.trim())  // Convert string to array on change
                : value
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isUpdating) {
                const response = await fetch(`http://localhost:4000/tourismGovernor/updatePlace/${currentPlaceId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const updatedPlace = await response.json();
                setPlaces(places.map(place => place._id === currentPlaceId ? { ...place, ...formData } : place));
                setIsUpdating(false);
                setCurrentPlaceId(null);
            } else {
                const response = await fetch('http://localhost:4000/tourismGovernor/addPlace', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const newPlace = await response.json();
                setPlaces([...places, newPlace]);
            }
            setFormData({
                title: '',
                description: '',
                location: '',
                pictures: [],
                openingHours: '',
                ticketPrices: [],  // Initialize as empty array
                tags: [],  
            });
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/tourismGovernor/deletePlace/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setPlaces(places.filter(place => place._id !== id));
        } catch (error) {
            console.error('Error deleting Historical Place:', error);
        }
    };

    const handleUpdate = (place) => {
        setFormData({
            ...place,
        });
        setIsUpdating(true);
        setCurrentPlaceId(place._id);
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleTagsChange = (event) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            tags: value.split(',').map(tag => tag.trim())
        });
    };

    const handleTicketChange = (event) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            ticketPrices: value.split(',').map(ticketPrice => ticketPrice.trim())
        });
    };

    return (
        <div className={styles.parent}>
            <div className={styles.container}>
                <div className={styles.createhistorical} ref={formRef}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <label className={styles.label}>Title</label>
                            <input className={styles.input} placeholder="Title" name="title" type="text" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className={styles.label}>Description</label>
                            <input className={styles.input} placeholder="Description" name="description" type="text" value={formData.description} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className={styles.label}>Location</label>
                            <input className={styles.input} placeholder="Location" name="location" type="text" value={formData.location} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label className={styles.label}>Ticket Prices</label>
                            <input 
                            className={styles.input} 
                            placeholder="Ticket Prices" 
                            name="ticketPrices" 
                            type="text" 
                            value={formData.ticketPrices.join(', ')} 
                            onChange={handleTicketChange} 
                            required
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Opening Hours</label>
                            <input className={styles.input} placeholder="Opening Hours" name="openingHours" type="text" value={formData.openingHours} onChange={handleChange} required/>
                        </div>       
                        <div>
                            <label className={styles.label}>Tags</label>
                            <input 
                            className={styles.input} 
                            placeholder="Tags" 
                            name="tags" 
                            type="text" 
                            value={formData.tags.join(',')} 
                            onChange={handleTagsChange} 
                            required
                            />
                        </div>
                        
                        
                        <button onClick={handleSubmit} className={styles.submit}>{isUpdating ? 'Update Historical Place' : 'Create Historical Place'}</button>
                    </form>
                </div>
            </div>
                <div className={styles.activitiescontainer}>
                    <label className={styles.label}>List of Historical Places</label>
                    <div>
                        {places.map((place, index) => (
                            <div key={place._id} className={styles.activitybox}>
                                <p><strong>{place.title}</strong></p>
                                <div className={styles.topcard}>
                                    <p><strong>Description:</strong> {place.description}</p>
                                </div>
                                <div className={styles.bottomcard}>
                                    <p><strong>Opening Hours:</strong> {place.openingHours}</p>
                                    <p><strong>Location:</strong> {place.location}</p>
                                    <p><strong>Ticket Prices:</strong> {place.ticketPrices}</p>
                                    <p><strong>Tags:</strong> {Array.isArray(place.tags) ? place.tags.join(',') : place.tags}</p>
                                    </div>
                                <button className={styles.update} onClick={() => handleUpdate(place)}>Update</button>
                                <button className={styles.delete} onClick={() => handleDelete(place._id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
}

export default Historicalplaces;