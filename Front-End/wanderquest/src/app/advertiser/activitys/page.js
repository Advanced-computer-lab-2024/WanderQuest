'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../components/Navbar'; 
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../../Styles/advertisercards.module.css';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import Foot from '../../../../components/foot';

const libraries = ['places'];


const activitypage = () => {
    const router = useRouter();


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCSGYfV3Wea6Maoh1Arq4aS86319xt39lo', // Replace with your Google Maps API key
        libraries,
    });

    const [activities, setActivities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const handleRedirectUpdate = (activity) =>{
        localStorage.setItem('activityToEdit', JSON.stringify(activity));
        router.push('/advertiser/createactivity');
    }

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
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const updatedActivity = await response.json();
                setActivities(activities.map(activity => activity._id === currentActivityId ? { ...activity, ...formData } : activity));
                setIsUpdating(false);
                setCurrentActivityId(null);
            } catch (error) {
                console.error('Error updating activity:', error);
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
            } catch (error) {
                console.error('Error creating activity:', error);
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

    return (
        <div className={styles.parent}>
            <Navbar />
            <div className={styles.activitiescontainer} style={{marginTop: '100px'}}>
                <label className={styles.label}>List of Activities</label>
                {activities.map((activity) => (
                    <div key={activity._id} className={styles.activitybox}>
                        <p><strong>{activity.title}</strong></p>
                        <p><strong>Date:</strong> {activity.formattedDate}</p>
                        <p><strong>Time:</strong> {activity.time}</p>
                        <p><strong>Location:</strong> {activity.location}</p>
                        <p><strong>Price:</strong> {activity.price}</p>
                        <p><strong>Category:</strong> {activity.category}</p>
                        <p><strong>Tags:</strong> {
                            Array.isArray(activity.tags)
                                ? activity.tags.map(tag => tag.type).join(', ')
                                : activity.tags
                        }</p>
                        <p><strong>Special Discount:</strong> {activity.specialDiscounts}</p>
                        <p><strong>{activity.bookingIsOpen ? 'Booking is open' : 'Booking is Closed'}</strong></p>
                        <div className={styles.buttonContainer}>
                            <button className={styles.update} onClick={() => handleRedirectUpdate(activity)}>Update</button>
                            <button className={styles.delete} onClick={() => handleDelete(activity._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <Foot />
        </div>

    );
};

export default activitypage;