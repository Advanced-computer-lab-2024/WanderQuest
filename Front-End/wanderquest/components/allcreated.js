// JSX File (Allcreated.js)

"use client";
import styles from '../Styles/allcreated.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import mountains from '../imgs/Mountains.jpg';

const Allcreated = () => {

    const router = useRouter();

    const handleRedirectUpdate = (itinerary) => {
        localStorage.setItem('itiToEdit', JSON.stringify(itinerary));
        router.push('/tourguide/crud');
    };

    const handleBack = () => { 
        router.back();
    };

    const [itineraries, setItineraries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [lastUpdated, setLastUpdated] = useState(null);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [guideId, setGuideId] = useState('');

    useEffect(() => {
        const fetchId = async () => {
            const response = await fetch('http://localhost:4000/authentication/user', {
                credentials: "include",
            });
            const data = await response.json();
            setGuideId(data._id);
        };
        fetchId();
    }, []);

    useEffect(() => {
        const fetchItineraries = async () => {
            const response = await fetch('http://localhost:4000/tourGuide/myItineraries', {
                credentials: "include",
            });
            const data = await response.json();
            setItineraries(data);
        };
        fetchItineraries();
    }, [lastUpdated]);

    const handleDelete = async (itinerary) => {
        if (itinerary.BookingAlreadyMade) {
            alert('Error: This itinerary has already been booked and cannot be deleted.');
            return;
        }

        const isConfirmed = window.confirm('Are you sure you want to delete this itinerary?');
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:4000/tourGuide/itineraries/${itinerary._id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Error deleting itinerary');
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
                return;
            }

            setLastUpdated(itinerary._id); // trigger re-fetch
            setMessage('Itinerary deleted successfully!');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        } catch (error) {
            setErrorMessage('Error deleting itinerary');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    const handleActivation = async (itineraryId) => {
        try {
            const response = await fetch(`http://localhost:4000/tourGuide/itinerary/activate/${itineraryId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ bookingIsOpen: true }),
            });

            if (!response.ok) {
                setErrorMessage("Booking is already open");
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
                return;
            }

            setItineraries(prevItineraries =>
                prevItineraries.map(itinerary =>
                    itinerary._id === itineraryId
                        ? { ...itinerary, bookingIsOpen: true }
                        : itinerary
                )
            );
            setLastUpdated(itineraryId);
            setMessage('Itinerary activated successfully!');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        } catch (error) {
            setErrorMessage('Error activating itinerary');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    const handleDeactivation = async (itineraryId) => {
        try {
            const response = await fetch(`http://localhost:4000/tourGuide/itinerary/deactivate/${itineraryId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ bookingIsOpen: false }),
            });

            if (!response.ok) {
                setErrorMessage(response.error);
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
                return;
            }

            setItineraries(prevItineraries =>
                prevItineraries.map(itinerary =>
                    itinerary._id === itineraryId
                        ? { ...itinerary, bookingIsOpen: false }
                        : itinerary
                )
            );
            setLastUpdated(itineraryId);
            setMessage('Itinerary deactivated successfully!');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        } catch (error) {
            setErrorMessage('Error deactivating itinerary');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    return (
        <div>
            <div className={styles.buttonContainer}>
                <button className={styles.back} onClick={handleBack}>Back To Home</button>
            </div>
            <div className={styles.heroSection}>
                <Image src={mountains} alt="Mountains" className={styles.heroImage} layout="fill" objectFit="cover" />
                <div className={styles.heroText}>
                    <h1>My Itineraries</h1>
                    <h3 className={styles.subtitle}>Where the magic happens</h3>
                </div>
            </div>

            <div className={styles.itinerariesContainer}>
                {/* Success and Error Messages */}
                {showMessage && <div className={styles.successMessage}>{message}</div>}
                {showError && <div className={styles.errorMessage}>{errorMessage}</div>}

                {/* Itineraries List */}
                <div className={styles.container}>
                    {itineraries.map((itinerary) => (
                        <div key={itinerary._id} className={styles.itineraryBox}>
                            <div className={styles.topSection}>
                                <p><strong>Title:</strong> {itinerary.title}</p>
                                <p><strong>Available Dates:</strong> {itinerary.availableDates.map(date => new Date(date).toLocaleDateString()).join(', ')}</p>
                                <p><strong>Time:</strong> {itinerary.time.join(', ')}</p>
                            </div>

                            <div className={styles.middleSection}>
                                <p><strong>Activities:</strong> {itinerary.activities.map(activity => activity.title).join(', ')}</p>
                                <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Yes' : 'No'}</p>
                            </div>

                            <div className={styles.bottomSection}>
                                <p><strong>Pick Up Location:</strong> {itinerary.pickUpLocation}</p>
                                <p><strong>Drop Off Location:</strong> {itinerary.dropOffLocation}</p>
                                <p><strong>Booking Already Made:</strong> {itinerary.BookingAlreadyMade ? 'Yes' : 'No'}</p>
                            </div>

                            <div className={styles.actionButtons}>
                                <button className={styles.update} onClick={() => handleRedirectUpdate(itinerary)}>Update</button>
                                <button className={styles.delete} onClick={() => handleDelete(itinerary)}>Delete</button>
                                <button 
                                    className={itinerary.bookingIsOpen ? styles.deactivate : styles.activate} 
                                    onClick={() => itinerary.bookingIsOpen ? handleDeactivation(itinerary._id) : handleActivation(itinerary._id)}>
                                    {itinerary.bookingIsOpen ? 'Deactivate' : 'Activate'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Allcreated;
