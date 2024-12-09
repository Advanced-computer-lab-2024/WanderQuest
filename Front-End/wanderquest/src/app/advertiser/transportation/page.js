"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../../Styles/activity.module.css';
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component
import Foot from '../../../../components/foot';
import axios from 'axios';


const Transportation = () => {
    const [transportation, setTransportation] = useState([]);
    const [id, setId] = useState('');

    const fetchUserRole = async () => {
        try {
            const response = await axios.get('http://localhost:4000/authentication/user', {
                withCredentials: true, // Include cookies if required
            });
            setId(response.data);
            console.log(response.data.companyName);
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    };

    useEffect(() => {
        fetchUserRole();
    }, []);

    const [formData, setFormData] = useState({
        type: "",
        price: "",
        departure: "",
        arrival: "",
        date: "",
        BookingAlreadyMade: false,
        pickUpLocation: "",
        dropOffLocation: "",
        createdBy: id._id,
        company:id.companyName
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentTransportationId, setCurrentTransportationId] = useState(null);

    const formRef = useRef(null);

    useEffect(() => {
        const fetchTransportation = async () => {
            try {
                const response = await fetch('http://localhost:4000/advertiser/transportations', {
                    credentials:"include"
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setTransportation(data);
            } catch (error) {
                console.error('Error fetching transportation:', error);
            }
        };

        fetchTransportation();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (isUpdating) {
            try {
                const response = await fetch(`http://localhost:4000/tourGuide/itineraries/${currentTransportationId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials:"include",
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setTransportation(transportation.map(transportation => transportation._id === currentTransportationId ? { ...transportation, ...data } : transportation));
                setIsUpdating(false);
                setCurrentTransportationId(null);
            } catch (error) {
                console.error('Error updating itinerary:', error);
            }
        } else {
            try {
                const response = await fetch('http://localhost:4000/advertiser/transportation/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials:"include",
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setTransportation([...transportation, data]);

            }
            catch (error) {
                console.error('Error creating Transportation:', error);
            }

        }
        setFormData({
            company: id.company,
            type: "",
            price: "",
            departure: "",
            arrival: "",
            date: "",
            BookingAlreadyMade: false,
            pickUpLocation: "",
            dropOffLocation: "",
            createdBy: id._id,
            company: id.companyName
        });
    };


    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };



    return (
        <div className={styles.parent}>
            <Navbar/>
            <div className={styles.activitiescontainer} style={{ marginBottom: '100px',marginTop: '100px' }}>
                <label className={styles.label}>List of Transportations</label>
                <div>
                    {transportation.map((transportation, index) => (
                        <div key={transportation._id} className={styles.activitybox}>
                            <p><strong>Company Name: {transportation.company}</strong></p>
                            <p><strong>Type of transportation:</strong> {transportation.type}</p>
                            <p><strong>Price:</strong> {transportation.price}</p>
                            <p><strong>Date:</strong> {transportation.date.split('T')[0]}</p>
                            <p><strong>Departure Time:</strong> {transportation.departure}</p>
                            <p><strong>Arrival Time:</strong> {transportation.arrival}</p>
                            <p><strong>Pick Up Location:</strong> {transportation.pickUpLocation}</p>
                            <p><strong>Drop Off Location:</strong> {transportation.dropOffLocation}</p>
                            <p><strong>Booking Already Made:</strong> {transportation.BookingAlreadyMade ? 'Yes' : 'No'}</p>
                            <p><strong>Created By:</strong> {transportation.createdBy}</p>                      
                            
                        </div>
                    ))}
                </div>
            </div>
            <Foot/>
        </div>
    );
};

export default Transportation;
