"use client";
import styles from '../Styles/activity.module.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const Activity = () => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCSGYfV3Wea6Maoh1Arq4aS86319xt39lo', // Replace with your Google Maps API key
        libraries,
    });

    const [activities, setActivities] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        price: '',
        category: '',
        tags: '',
        specialDiscounts: '',
        bookingIsOpen: false
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentActivityId, setCurrentActivityId] = useState(null);

    const autocompleteRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        // Fetch activities from the backend
        const fetchActivities = async () => {
            const response = await axios.get('http://localhost:4000/activityRoutes/activities');
            setActivities(response.data);
        };
        fetchActivities();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        setFormData({
            ...formData,
            location: place.formatted_address
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUpdating) {
            await axios.put(`http://localhost:4000/activityRoutes/activity/${currentActivityId}`, formData);
            setActivities(activities.map(activity => activity._id === currentActivityId ? { ...activity, ...formData } : activity));
            setIsUpdating(false);
            setCurrentActivityId(null);
        } else {
            const response = await axios.post('http://localhost:4000/activityRoutes/activity', formData);
            setActivities([...activities, response.data]);
        }
        setFormData({
            title: '',
            date: '',
            time: '',
            location: '',
            price: '',
            category: '',
            tags: '',
            specialDiscounts: '',
            bookingIsOpen: false
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/activityRoutes/activity/${id}`);
            setActivities(activities.filter(activity => activity._id !== id));
        } catch (error) {
            console.error('Error deleting activity:', error);
        }
    };

    const handleUpdate = (activity) => {
        const parsedDate = new Date(activity.formattedDate).toISOString().split('T')[0]; // Convert formattedDate to YYYY-MM-DD format
        setFormData({
            ...activity,
            date: parsedDate
        });
        setIsUpdating(true);
        setCurrentActivityId(activity._id);
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className={styles.parent}>
            <div className={styles.container}>
                <div className={styles.createactivity} ref={formRef}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <label className={styles.label}>Title</label>
                            <input className={styles.input} placeholder="Title" name="title" type="text" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className={styles.label}>Date</label>
                            <input className={styles.input} name="date" type="date" value={formData.date} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label className={styles.label}>Time</label>
                            <input className={styles.input} name="time" type="time" value={formData.time} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label className={styles.label}>Location</label>
                            <Autocomplete onLoad={ref => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceChanged}>
                                <input className={styles.input} placeholder="Location" name="location" type="text" value={formData.location} onChange={handleChange} required/>
                            </Autocomplete>
                        </div>
                        <div>
                            <label className={styles.label}>Price</label>
                            <input className={styles.input} placeholder="Price" name="price" type="number" value={formData.price} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label className={styles.label}>Category</label>
                            <input className={styles.input} placeholder="Category" name="category" type="text" value={formData.category} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label className={styles.label}>Tags</label>
                            <input className={styles.input} placeholder="Tags" name="tags" type="text" value={formData.tags} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label className={styles.label}>Special Discounts</label>
                            <input className={styles.input} placeholder="Special Discounts" name="specialDiscounts" type="text" value={formData.specialDiscounts} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label className={styles.label}>Booking is Open?</label>
                            <input className={styles.input} name="bookingIsOpen" type="checkbox" checked={formData.bookingIsOpen} onChange={handleChange} />
                        </div>
                        <button type="submit" className={styles.submit}>{isUpdating ? 'Update Activity' : 'Create Activity'}</button>
                    </form>
                </div>
            </div>
                <div className={styles.activitiescontainer}>
                    <label className={styles.label}>List of activities</label>
                    <div>
                        {activities.map((activity, index) => (
                            <div key={activity._id} className={styles.activitybox}>
                                <p><strong>{activity.title}</strong></p>
                                <div className={styles.topcard}>
                                    <p><strong>Date:</strong> {activity.formattedDate}</p>
                                    <p><strong>Time:</strong> {activity.time}</p>
                                    <p><strong>Location:</strong> {activity.location}</p>
                                    <p><strong>Price:</strong> {activity.price}</p>
                                </div>
                                <div className={styles.bottomcard}>
                                    <p><strong>Category:</strong> {activity.category}</p>
                                    <p><strong>Tags:</strong> {activity.tags}</p>
                                    <p><strong>Special Discount:</strong> {activity.specialDiscounts}</p>
                                    <p><strong>{activity.bookingIsOpen ? 'Booking is open' : 'Booking is Closed'}</strong></p>
                                </div>
                                <button className={styles.update} onClick={() => handleUpdate(activity)}>Update</button>
                                <button className={styles.delete} onClick={() => handleDelete(activity._id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
};

export default Activity;