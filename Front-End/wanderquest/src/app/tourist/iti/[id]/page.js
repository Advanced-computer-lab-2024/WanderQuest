'use client';
import Navbar from "../../../../../components/Navbar";
import { useState, useEffect } from "react";
import styles from '/Styles/Itineraries.module.css';

const ItinerarydetailsPage = ({ params }) => {
    const id = params.id;
    const [itinerary, setAllItineraries] = useState({});
    const [activityDetails, setActivityDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const share=()=>{
        navigator.share({
            url:'http://localhost:3000/tourist/iti/'+id
        })
    }
    const fetchActivityDetails = (activityId) => {
        if (activityDetails[activityId]) return; // Avoid refetching

        fetch(`http://localhost:4000/advertiser/activity/${activityId}`)
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

    const fetchItineraries = () => {
        fetch(`http://localhost:4000/tourist/upcomingItineraries/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error fetching itineraries: ${res.statusText}`);
                }
                return res.json();
            })
            .then(data => {
                setAllItineraries(data);
                setLoading(false);

                // Fetch details for all activities
                if (data.activities) {
                    data.activities.forEach(activityId => {
                        fetchActivityDetails(activityId);
                    });
                }
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchItineraries();
    }, []);

    if (loading) return <p>Loading itinerary...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Navbar />
            <div className={styles.itinerary}>
                <h2 className={styles.itineraryTitle}>{itinerary.title}</h2>
                <div className={styles.activities}>
                    {itinerary.activities && itinerary.activities.map((activityId) => (
                        <div key={activityId} className={styles.activity}>
                            {activityDetails[activityId] ? (
                                <>
                                    <h3>Activity</h3>
                                    <p><strong>Title:</strong> {activityDetails[activityId].title}</p>
                                    <p><strong>Date:</strong> {activityDetails[activityId].date}</p>
                                    <p><strong>Time:</strong> {activityDetails[activityId].time}</p>
                                    <p><strong>Location:</strong> {activityDetails[activityId].location}</p>
                                </>
                            ) : (
                                <p>Loading activity details...</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.locations}>
                    {itinerary.locations && itinerary.locations.map((location, idx) => (
                        <p key={idx}><strong>Location:</strong> {location}</p>
                    ))}
                </div>
                <p><strong>Timeline:</strong> {itinerary.timeline}</p>
                <p><strong>Duration:</strong> {itinerary.duration}</p>
                <p><strong>Language:</strong> {itinerary.language}</p>
                <p><strong>Price:</strong> ${itinerary.price}</p>
                <p><strong>Rating:</strong> {itinerary.rating}</p>
                <div className={styles.dates}>
                    {itinerary.availableDates && itinerary.availableDates.map((date, idx) => (
                        <p key={idx}><strong>Date:</strong> {date}</p>
                    ))}
                </div>
                <div className={styles.times}>
                    {itinerary.time && itinerary.time.map((time, idx) => (
                        <p key={idx}><strong>Time:</strong> {time}</p>
                    ))}
                </div>
                <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Yes' : 'No'}</p>
                <p><strong>Pick Up Location:</strong> {itinerary.pickUpLocation}</p>
                <p><strong>Drop Off Location:</strong> {itinerary.dropOffLocation}</p>
                <p><strong>Booking Already Made:</strong> {itinerary.BookingAlreadyMade ? 'Yes' : 'No'}</p>
                <button className={styles.addticket}>
                    Book
                </button>
                <button onClick={share}>share link</button>
            </div>
        </>
    );
};

export default ItinerarydetailsPage;