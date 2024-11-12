"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from '../Styles/cruditinerary.module.css';


const CrudTransportation = (props) => {
    const advertiserId = props.advertiserId;
    const [transportation, setTransportation] = useState([]);
    const [formData, setFormData] = useState({
        company: "",
        type: "",
        price: "",
        departure: "",
        arrival: "",
        date: "",
        BookingAlreadyMade: false,
        pickUpLocation: "",
        dropOffLocation: "",
        createdBy: advertiserId
        
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentTransportationId, setCurrentTransportationId] = useState(null);

    const formRef = useRef(null);


    useEffect(() => {
        // Fetch itineraries from the backend
        const fetchTransportation = async () => {
            try {
                const response = await fetch('http://localhost:4000/advertiser/transportations');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTransportation(data);
            } catch (error) {
                console.error('Error fetching Transportations:', error);
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
            company: "",
            type: "",
            price: "",
            departure: "",
            arrival: "",
            date: "",
            BookingAlreadyMade: false,
            pickUpLocation: "",
            dropOffLocation: "",
            createdBy: advertiserId

        });
    };

    const handleDelete = async (transportation) => {
        if (transportation.BookingAlreadyMade) {
            alert('Error: This itinerary has already been booked and cannot be deleted.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:4000/tourGuide/itineraries/${transportation._id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error('Network response was not ok');
            }

            setTransportation(transportation.filter(item => item._id !== transportation._id));
        } catch (error) {
            console.error('Error deleting Transportation:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleUpdate = (transportation) => {
        setFormData({
            ...transportation,
            BookingAlreadyMade: transportation.BookingAlreadyMade ? true : false

        });
        setIsUpdating(true);
        setCurrentTransportationId(transportation._id);
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };



    return (
        <div className={styles.parent}>
            <div className={styles.container}>
                <div className={styles.createItinerary} ref={formRef}>
                    <form className={styles.form} onSubmit={handleSubmit}>

                        <div>
                            <label className={styles.label}>Type of transportation</label>
                            <input className={styles.input} placeholder="Add your Type of transportation" name="type" type="text" value={formData.type} onChange={handleChange} required />
                        </div>
                        
                        <div>
                            <label className={styles.label}>Price</label>
                            <input className={styles.input} placeholder="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                        </div>

                        <div>
                            <label className={styles.label}>Date</label>
                            <input className={styles.input} placeholder="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                        </div>
                        
                        <div>
                            <label className={styles.label}>Departure Time</label>
                            <input className={styles.input} placeholder="Departure" name="departure" type="time" value={formData.departure} onChange={handleChange} required />
                        </div>

                        <div>
                            <label className={styles.label}>Arrival Time</label>
                            <input className={styles.input} placeholder="Arrival" name="arrival" type="time" value={formData.arrival} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className={styles.label}>Pick Up Location</label>
                            <input
                                className={styles.input}
                                placeholder="Pick Up Location"
                                name="pickUpLocation"
                                type="text"
                                value={formData.pickUpLocation}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Drop Off Location</label>
                            <input
                                className={styles.input}
                                placeholder="Drop Off Location"
                                name="dropOffLocation"
                                type="text"
                                value={formData.dropOffLocation}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className={styles.label}>Booking Already Made</label>
                            <input
                                className={styles.input}
                                name="BookingAlreadyMade"
                                type="checkbox"
                                checked={formData.BookingAlreadyMade}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className={styles.submit}>{isUpdating ? 'Update Transportation' : 'Create Transportation'}</button>
                    </form>
                </div>
            </div>
            <div className={styles.itinerariesContainer}>
                <label className={styles.label}>List of Transportations</label>
                <div>
                    {transportation.map((transportation, index) => (
                        <div key={transportation._id} className={styles.itineraryBox}>
                            <p><strong>Company Name: {transportation.company}</strong></p>
                            <p><strong>Type of transportation:</strong> {transportation.type}</p>
                            <p><strong>Price:</strong> {transportation.price}</p>
                            <p><strong>Date:</strong> {transportation.date}</p>
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
        </div>
    );
}

export default CrudTransportation;
