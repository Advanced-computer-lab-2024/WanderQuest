"use client";
import styles from "../Styles/historicalplaces.module.css";
import { useState, useEffect, useRef } from 'react';

const Historical = () => {

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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isUpdating) {
                const response = await fetch(`http://localhost:4000/tourismGovernor/updatePlace/${currentPlaceId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Failed to update place');
                }
                alert('Place updated successfully');
            } else {
                const response = await fetch('http://localhost:4000/tourismGovernor/createPlace', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Failed to create place');
                }
                alert('Place created successfully');
            }
            // Clear the form
            setFormData({
                title: '',
                description: '',
                location: '',
                pictures: [],
                openingHours: '',
                ticketPrices: [],
                tags: [],
            });
            // Fetch the updated list of places
            fetchPlaces();
        } catch (error) {
            console.error('Failed to create/update place:', error);
        }
    };

    const handleEdit = (place) => {
        setFormData({
            title: place.title,
            description: place.description,
            location: place.location,
            pictures: place.pictures,
            openingHours: place.openingHours,
            ticketPrices: place.ticketPrices,
            tags: place.tags,
        });
        setIsUpdating(true);
        setCurrentPlaceId(place._id);
        formRef.current.scrollIntoView();
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/tourismGovernor/deletePlace/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete place');
            }
            alert('Place deleted successfully');
            // Fetch the updated list of places
            fetchPlaces();
        } catch (error) {
            console.error('Failed to delete place:', error);
        }
    };

    return (
        <div className={styles.parent}>
            <div className={styles.overlay}>
            <h1>Historical Places</h1>
            <form ref={formRef} onSubmit={handleSubmit}>
                <input className={styles.input} type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                <input className={styles.input} type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                <input className={styles.input} type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                <input className={styles.input} type="text" name="openingHours" value={formData.openingHours} onChange={handleChange} placeholder="Opening Hours" required />
                <input className={styles.input} type="text" name="ticketPrices" value={formData.ticketPrices} onChange={handleChange} placeholder="Ticket Prices" required />
                <input className={styles.input} type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags" required />
                <button type="submit">{isUpdating ? 'Update' : 'Create'}</button>
            </form>
            </div>
            <div className={styles.activitiescontainer}>
                <label>Historical Places:</label>
                {places.map(place => (
                    <div key={place._id} className={styles.activitybox}>
                        <h2>{place.title}</h2>
                        <p>{place.description}</p>
                        <p>{place.location}</p>
                        <p>{place.openingHours}</p>
                        <p>{place.ticketPrices ? place.ticketPrices.join(', '):''}</p>
                        <p>{place.tags ? place.tags.join(', ') : ''}</p>
                        <button className={styles.update} onClick={() => handleEdit(place)}>Update</button>
                        <button className={styles.delete} onClick={() => handleDelete(place._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Historical;