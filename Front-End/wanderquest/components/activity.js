"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from '../Styles/activity.module.css';

// import axios from 'axios'; // Removed unused import
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const Activity = () => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCSGYfV3Wea6Maoh1Arq4aS86319xt39lo', // Replace with your Google Maps API key
        libraries,
    });

    const [activities, setActivities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' }); // State for notifications


    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);
    

    useEffect(() => {
        // Fetch tags from the backend
        const fetchTags = async () => {
            try {
                const response = await fetch('http://localhost:4000/advertiser/tags', {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTags(data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };
        fetchTags();
    }, []);

    useEffect(() => {
        // Fetch categories from the backend
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:4000/advertiser/categories', {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        price: '',
        category: '',
        tags: [],
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
            try {
                const response = await fetch('http://localhost:4000/activityRoutes/myActivities', {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setActivities(data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
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
            try {
                const response = await fetch(`http://localhost:4000/activityRoutes/activity/${currentActivityId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials:"include",
                    body: JSON.stringify(formData),
                });
                
                await response.json();
                setActivities(activities.map(activity => activity._id === currentActivityId ? { ...activity, ...formData } : activity));
                setNotification({ message: 'Activity updated successfully!', type: 'success' });
                setIsUpdating(false);
                setCurrentActivityId(null);
            } catch (error) {
                console.error('Error updating activity:', error);
                setNotification({ message: `Error: ${error.message}`, type: 'error' });

            }
        } else {
            try {

                const response = await fetch('http://localhost:4000/activityRoutes/activity', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials:"include",
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const newActivity = await response.json();
                console.log(newActivity);
                setActivities([...activities, newActivity]);
                setNotification({ message: 'Activity created successfully!', type: 'success' });

            } catch (error) {
                console.error('Error creating activity:', error);
                setNotification({ message: `Error: ${error.message}`, type: 'error' });

            }
        }
        setFormData({
            title: '',
            date: '',
            time: '',
            location: '',
            price: '',
            category: '',
            tags: [],
            specialDiscounts: '',
            bookingIsOpen: false
        });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/activityRoutes/activity/${id}`, {
                method: 'DELETE',
                credentials:"include"
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setActivities(activities.filter(activity => activity._id !== id));
            setNotification({ message: 'Activity deleted successfully!', type: 'success' });

        } catch (error) {
            console.error('Error deleting activity:', error);
            setNotification({ message: `Error: ${error.message}`, type: 'error' });

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

// Handle tags through checkboxes
const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    setFormData((prevFormData) => {
        const updatedTags = checked
            ? [...prevFormData.tags, { type: value }] // Add tag if checked
            : prevFormData.tags.filter((formTag) => formTag.type !== value); // Remove tag if unchecked
        
        return {
            ...prevFormData,
            tags: updatedTags,
        };
    });
};

const handleSelectChange = (selectedOptions) => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        tags: tags.filter((tag) => selectedOptions.includes(tag.type)),
    }));
};

useEffect(() => {
    const storedPlace = localStorage.getItem('activityToEdit');
    if (storedPlace) {
        const activityToEdit = JSON.parse(storedPlace);
        const parsedDate = new Date(activityToEdit.formattedDate).toISOString().split('T')[0]; // Convert formattedDate to YYYY-MM-DD format

        setFormData({
            title: activityToEdit.title || '',
            date: parsedDate || '',
            location: activityToEdit.location || '',
            time: activityToEdit.time || '',
            price: activityToEdit.price || '',
            category: activityToEdit.category || '',
            specialDiscounts: activityToEdit.specialDiscounts || '',
            bookingIsOpen: activityToEdit.bookingIsOpen || false,
            tags: Array.isArray(activityToEdit.tags) ? activityToEdit.tags.map(tag => ({ type: tag.type })) : [],
        });
        setIsUpdating(true);
        setCurrentActivityId(activityToEdit._id);
        localStorage.removeItem('activityToEdit'); // Clean up after loading
    }
}, []);



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
                            <input className={styles.input} name="date" type="date" value={formData.date} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className={styles.label}>Time</label>
                            <input className={styles.input} name="time" type="time" value={formData.time} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className={styles.label}>Location</label>
                            <Autocomplete onLoad={ref => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceChanged}>
                                <input className={styles.input} placeholder="Location" name="location" type="text" value={formData.location} onChange={handleChange} required />
                            </Autocomplete>
                        </div>
                        <div>
                            <label className={styles.label}>Price</label>
                            <input className={styles.input} placeholder="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className={styles.label}>Category</label>
                            <select
                                className={styles.input}
                                name="category"
                                value={formData.category}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        category: value,
                                    }));
                                }}
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category.category}>
                                        {category.category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={styles.label}>Tags</label>
                            <select
                                className={styles.multiselect}
                                name="tags"
                                value={formData.tags.map((tag) => tag.type)} // Ensure this maps correctly to the selected values
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
                                    handleSelectChange(selectedOptions);
                                }}
                                multiple
                            >
                                {tags.map((tag) => (
                                    <option key={tag._id} value={tag.type}>
                                        {tag.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={styles.label}>Special Discounts</label>
                            <input className={styles.input} placeholder="Special Discounts" name="specialDiscounts" type="text" value={formData.specialDiscounts} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className={styles.label}>Booking is Open?</label>
                            <input className={styles.input} name="bookingIsOpen" type="checkbox" checked={formData.bookingIsOpen} onChange={handleChange} />
                        </div>
                        <button type="submit" className={styles.submit}>{isUpdating ? 'Update Activity' : 'Create Activity'}</button>
                    </form>
                </div>
             </div>

             {notification.message && (
                <div
                    className={
                        notification.type === 'success'
                            ? styles.successMessage
                            : styles.errorMessage
                    }
                >
                    {notification.message}
                </div>
            )}
            {/*<div className={styles.activitiescontainer}>
                <label className={styles.label}>List of activities</label>
                <div>
                    {activities.map((activity) => (
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
                                <p><strong>Tags:</strong> {
                                    Array.isArray(activity.tags)
                                        ? activity.tags.map(tag => tag.type).join(', ')
                                        : activity.tags
                                }</p>
                                <p><strong>Special Discount:</strong> {activity.specialDiscounts}</p>
                                <p><strong>{activity.bookingIsOpen ? 'Booking is open' : 'Booking is Closed'}</strong></p>
                            </div>
                            <button className={styles.update} onClick={() => handleUpdate(activity)}>Update</button>
                            <button className={styles.delete} onClick={() => handleDelete(activity._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
};

export default Activity;