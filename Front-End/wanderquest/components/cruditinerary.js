"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from '../Styles/cruditinerary.module.css';
import axios from 'axios';


const Cruditinerary = () => {
    const [activityDetails, setActivityDetails] = useState({});
    const [itineraries, setItineraries] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        activities: [],
        locations: [],
        timeline: '',
        duration: '',
        language: '',
        price: '',
        availableDates: [],
        time: [],
        accessibility: false,
        pickUpLocation: '',
        dropOffLocation: '',
        tags: [],
        BookingAlreadyMade: false
    });

    const [activitiesList, setActivitiesList] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentItineraryId, setCurrentItineraryId] = useState(null);
    const [newDate, setNewDate] = useState('');


    const formRef = useRef(null);

    useEffect(() => {
        // Fetch itineraries from the backend
        const fetchItineraries = async () => {
            try {
                const response = await fetch('http://localhost:4000/tourGuide/itineraries');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItineraries(data);
            } catch (error) {
                console.error('Error fetching itineraries:', error);
            }
        };
        fetchItineraries();
    }, []);



    useEffect(() => {
        // Fetch activities from the backend
        const fetchActivities = async () => {
            try {
                const response = await fetch('http://localhost:4000/advertiser/activities');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Data:', data);
                setActivitiesList(data);
                console.log("activity list:", activitiesList);

            } catch (error) {
                console.error('Error fetching activities:', error);
            }


        };
        fetchActivities();
    }, []);


    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            activities: formData.activities.map(activityId => {
                const activity = activitiesList.find(act => act._id === activityId);
                if (!activity) {
                    console.error(`Activity with ID ${activityId} not found`);
                    return activityId; // Return the ID itself if the activity is not found
                }
                return activity._id;
            })
        };
        console.log('Updated form data:', updatedFormData);
        if (isUpdating) {
            try {
                const response = await fetch(`http://localhost:4000/tourGuide/itineraries/${currentItineraryId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedFormData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setItineraries(itineraries.map(itinerary => itinerary._id === currentItineraryId ? { ...itinerary, ...data } : itinerary));
                setIsUpdating(false);
                setCurrentItineraryId(null);
            } catch (error) {
                console.error('Error updating itinerary:', error);
            }
        } else {
            try {
                const response = await fetch('http://localhost:4000/tourGuide/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedFormData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setItineraries([...itineraries, data]);

            }
            catch (error) {
                console.error('Error creating itinerary:', error);
            }

        }
        setFormData({
            title: '',
            activities: [],
            locations: [],
            timeline: '',
            duration: '',
            language: '',
            price: '',
            availableDates: [],
            time: [],
            accessibility: false,
            pickUpLocation: '',
            dropOffLocation: '',
            tags: [],
            BookingAlreadyMade: false
        });
    };



    const handleDelete = async (itinerary) => {
        if (itinerary.bookingAlreadyMade) {
            alert('Error: This itinerary has already been booked and cannot be deleted.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/tourGuide/itineraries/${itinerary._id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error('Network response was not ok');
            }

            setItineraries(itineraries.filter(item => item._id !== itinerary._id));
        } catch (error) {
            console.error('Error deleting itinerary:', error);
        }
    };

    const handleUpdate = (itinerary) => {
        setFormData({
            ...itinerary,
            activities: itinerary.activities
                .filter(activity => typeof activity._id === 'string') // Filter activities to include only those with string IDs
                .map(activity => activity._id) // Map activities to their IDs
        });
        setIsUpdating(true);
        setCurrentItineraryId(itinerary._id);
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleActivitiesChange = (event) => {
        const { value, checked } = event.target;
        if (typeof value === 'string') {
            setFormData(prevState => {
                const activities = checked
                    ? [...prevState.activities, value]
                    : prevState.activities.filter(activity => activity !== value);
                return { ...prevState, activities };
            });
        }
    };

    const handleLocationsChange = (event) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            locations: value.split(',').map(location => location.trim())
        });
    };

    const handleAvailableDatesChange = (event) => {
        const { value } = event.target;
        setNewDate(value);
    };

    const addDate = () => {
        if (newDate) {
            setFormData(prevState => ({
                ...prevState,
                availableDates: [...prevState.availableDates, newDate]
            }));
            setNewDate('');
        }
    };

    const handleTimeChange = (event) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            time: value.split(',').map(time => time.trim())
        });
    };

    const removeDate = (index) => {
        setFormData(prevState => ({
            ...prevState,
            availableDates: prevState.availableDates.filter((_, i) => i !== index)
        }));
    };

    const fetchActivityDetails = (activityId) => {
        if (activityDetails[activityId]) return; // Avoid refetching

        fetch('http://localhost:4000/advertiser/activity/${activityId}')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error fetching activity ${activityId}: ${res.statusText}`);
                }
                return res.json();
            })
            .then(data => {
                setActivityDetails(prevDetails => ({
                    ...prevDetails,
                    [activityId]: data,
                }));
            })
            .catch(error => {
                setError(error.message);
            });
    };

    return (
        <div className={styles.parent}>
            <div className={styles.container}>
                <div className={styles.createItinerary} ref={formRef}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <label className={styles.label}>Title</label>
                            <input className={styles.input} placeholder="Title" name="title" type="text" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className={styles.activitiescontainer}>
                            <label className={styles.activitieslabel}>Activities</label>
                            <div className={styles.activitiescheckboxes}>
                                {activitiesList.map(activity => (
                                    <div key={activity._id}>
                                        <input
                                            type="checkbox"
                                            id={activity._id}
                                            value={activity._id}
                                            checked={formData.activities.includes(activity._id)}
                                            onChange={handleActivitiesChange}
                                        />
                                        <label htmlFor={activity._id}>{activity.title}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className={styles.label}>Locations</label>
                            <input
                                className={styles.input}
                                placeholder="Enter locations separated by commas"
                                name="locations"
                                type="text"
                                value={formData.locations.join(', ')}
                                onChange={handleLocationsChange}
                                required
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Timeline</label>
                            <input className={styles.input} placeholder="Add your Timeline" name="timeline" type="text" value={formData.timeline} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className={styles.label}>Duration</label>
                            <input className={styles.input} placeholder="duration" name="duration" type="text" value={formData.duration} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className={styles.label}>Language of Tour</label>
                            <input className={styles.input} placeholder="language of tour" name="language" type="text" value={formData.language} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className={styles.label}>Price</label>
                            <input className={styles.input} placeholder="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className={styles.label}>Available Dates</label>
                            <input
                                className={styles.input}
                                name="availableDates"
                                type="date"
                                value={newDate}
                                onChange={handleAvailableDatesChange}
                            />
                            <button type="button" onClick={addDate}>Add Another Date</button>
                            <div>
                                {formData.availableDates.map((date, index) => (
                                    <div key={index}>
                                        <span>{new Date(date).toLocaleDateString()}</span>
                                        <button type="button" onClick={() => removeDate(index)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className={styles.label}>Available Times</label>
                            <input
                                className={styles.input}
                                placeholder="Enter times separated by commas (HH:MM)"
                                name="time"
                                type="text"
                                value={formData.time.join(', ')}
                                onChange={handleTimeChange}
                                required
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Accessibility</label>
                            <input
                                className={styles.input}
                                name="accessibility"
                                type="checkbox"
                                checked={formData.accessibility}
                                onChange={handleChange}
                            />
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

                        <button type="submit" className={styles.submit}>{isUpdating ? 'Update Itinerary' : 'Create Itinerary'}</button>
                    </form>
                </div>
            </div>
            <div className={styles.itinerariesContainer}>
                <label className={styles.label}>List of Itineraries</label>
                <div>
                    {itineraries.map((itinerary, index) => (
                        <div key={itinerary._id} className={styles.itineraryBox}>
                            <p><strong>Title: {itinerary.title}</strong></p>
                            <p><strong>Activities:</strong> {
                                itinerary.activities
                                    .map(activity => activity.title)
                                    .join(', ')
                            }</p>
                            <p><strong>Available Dates:</strong> {itinerary.availableDates.map(date => new Date(date).toLocaleDateString()).join(', ')}</p>
                            <p><strong>Time:</strong> {itinerary.time.join(', ')}</p>
                            <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Yes' : 'No'}</p>
                            <p><strong>Pick Up Location:</strong> {itinerary.pickUpLocation}</p>
                            <p><strong>Drop Off Location:</strong> {itinerary.dropOffLocation}</p>
                            <p><strong>Booking Already Made:</strong> {itinerary.BookingAlreadyMade ? 'Yes' : 'No'}</p>
                            <button className={styles.update} onClick={() => handleUpdate(itinerary)}>Update</button>
                            <button className={styles.delete} onClick={() => handleDelete(itinerary)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Cruditinerary;