"use client";
import styles from '../Styles/allcreated.module.css';
import { useState, useEffect } from 'react';

const Allcreated = () => {
    const [activities, setActivities] = useState([]);
    const [itineraries, setItineraries] = useState([]);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            const id = '507f1f77bcf86cd799439011';
            const response = await fetch(`http://localhost:4000/activityRoutes/myActivities/${id}`);
            const data = await response.json();
            setActivities(data);
        };
        fetchActivities();
    }, []);

    useEffect(() => {
        const fetchItineraries = async () => {
            const id2 = '507f1f77bcf86cd799439013';
            const response = await fetch(`http://localhost:4000/tourGuide/myItineraries/${id2}`);
            const data = await response.json();
            setItineraries(data);
        };
        fetchItineraries();
    }, []);

    useEffect(() => {
        const fetchHistorical = async () => {
            const id3 = '507f1f77bcf86cd799439011';
            const response = await fetch(`http://localhost:4000/tourismGovernor/myPlaces/${id3}`);
            const data = await response.json();
            setPlaces(data);
        };
        fetchHistorical();
    }, []);



    return (
        <>
        <div className={styles.activitiescontainer}>
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
                            </div>
                    ))}
                </div>
            </div>

            <div className={styles.itinerariesContainer}>
                <label className={styles.label}>List of Itineraries</label>
                <div>
                    {itineraries && itineraries.map((itinerary, index) => (
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
                            </div>
                    ))}
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
                                    <p><strong>Tags:</strong> {Array.isArray(place.tags) ? place.tags.join(', ') : place.tags}</p>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
            </>
    );
}

export default Allcreated;