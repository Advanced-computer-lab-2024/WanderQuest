'use client';
import Navbar from '../../../../components/Navbar'; 
import React, { useState, useEffect, useRef } from 'react';
import styles from '../Styles/activity.module.css';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import Foot from '../../../../components/foot';

const libraries = ['places'];


const activitypage = () => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCSGYfV3Wea6Maoh1Arq4aS86319xt39lo', // Replace with your Google Maps API key
        libraries,
    });

    const [activities, setActivities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

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

    return (
        <div>
            <Navbar />
            <Foot />
        </div>
    );
};

export default activitypage;