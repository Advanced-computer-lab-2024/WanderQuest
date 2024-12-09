'use client'
import styles from '../Styles/historicalplaces.module.css';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Sph from '../public/logo.png';

const Historicalplaces = () => {
    const router = useRouter();

    const [places, setPlaces] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        pictures: [],
        openingHours: '',
        ticketPrices: [],  // Initialize as empty array
        tags: [],  // Initialize as empty array
    });

    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    const imageRef = useRef(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);

    const formRef = useRef(null);

    const [govId, setGovId] = useState('');

    const [showMessage, setShowMessage] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [picture, setPicture] = useState(null); 

    const handleRedirectHome = () =>{
        router.push('/governer');
    }

    useEffect(()=> {
        const fetchGovId = async () =>{
            const respone = await fetch('http://localhost:4000/authentication/user',{
                credentials: 'include',
            });
            const data = await respone.json();
            const governorId = data._id;
            setGovId(governorId);
            console.log(governorId);
            console.log(data.role);
        }
        fetchGovId();
    }, [])

    useEffect(() => {
        // Fetch historical places from the backend
        const fetchPlaces = async () => {
            try {
                const response = await fetch('http://localhost:4000/tourismGovernor/places');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlaces(data);
            } catch (error) {
                console.error('Failed to fetch places:', error);
            }
        };
        fetchPlaces();
    }, []);

    useEffect(() => {
        const storedPlace = localStorage.getItem('placeToEdit');
        if (storedPlace) {
            const placeToEdit = JSON.parse(storedPlace);
            setFormData({
                title: placeToEdit.title || '',
                description: placeToEdit.description || '',
                location: placeToEdit.location || '',
                pictures: placeToEdit.pictures || [],
                openingHours: placeToEdit.openingHours || '',
                ticketPrices: placeToEdit.ticketPrices || [], 
                tags: Array.isArray(placeToEdit.tags) ? placeToEdit.tags.map(tag => tag.type) : [],
            });
            setIsUpdating(true);
            setCurrentPlaceId(placeToEdit._id);
            localStorage.removeItem('placeToEdit'); // Clean up after loading
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormData({
            ...formData,
            [name]: (name === 'ticketPrices' || name === 'tags') 
                ? value.split(',').map(item => item.trim())  // Convert string to array on change
                : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Reset messages
        setShowMessage(false);
        setConfirmMessage('');
        setErrorMessage('');
    
        try {
            // Format tags as objects
            const formattedTags = formData.tags.map((tag) =>
                typeof tag === "string" ? { type: tag } : tag
            );
    
            // Prepare payload
            const payload = {
                ...formData,
                createdBy: govId,
                tags: formattedTags,
            };
    
            // Send request
            const response = isUpdating
                ? await fetch(
                      `http://localhost:4000/tourismGovernor/updatePlace/${currentPlaceId}`,
                      {
                          method: "PATCH",
                          headers: {
                              "Content-Type": "application/json",
                          },
                          credentials: "include",
                          body: JSON.stringify(payload),
                      }
                  )
                : await fetch("http://localhost:4000/tourismGovernor/addPlace", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      credentials: "include",
                      body: JSON.stringify(payload),
                  });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "An error occurred while submitting the form.");
            }
    
            const result = await response.json();
    
            // Update state
            if (isUpdating) {
                setPlaces(
                    places.map((place) =>
                        place._id === currentPlaceId ? { ...place, ...formData } : place
                    )
                );
            } else {
                setPlaces([...places, result]);
            }
    
            // Reset form
            setFormData({
                title: "",
                description: "",
                location: "",
                pictures: [],
                openingHours: "",
                ticketPrices: [],
                tags: [],
            });
            setIsUpdating(false);
            setCurrentPlaceId(null);
    
            // Show confirmation message
            setConfirmMessage(isUpdating ? "Place updated successfully!" : "Place created successfully!");
            setShowMessage(true);
        } catch (error) {
            console.error("Failed to submit form:", error);
            setErrorMessage("Failed to create/update the place. Please try again.");
            setShowMessage(true);
        }
    };
    

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/tourismGovernor/deletePlace/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setPlaces(places.filter(place => place._id !== id));
        } catch (error) {
            console.error('Error deleting Historical Place:', error);
        }
    };

    const handleUpdate = (place) => {
        setFormData({
            ...place,
        });
        setIsUpdating(true);
        setCurrentPlaceId(place._id);
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleTagsChange = (event) => {
        const { value } = event.target;
        const mapobject = value.split(',').map(tag => ({ type: tag.trim() }));
        setFormData({
            ...formData,
            tags: mapobject.map(tag => tag.type)
        });
    };

    const handleChangePicture = (event) => {
        const file = event.target.files[0];
        setFormData({
            ...formData,
            pictures: [...formData.pictures, file],  // Add file to the pictures array
        });
        setPicture(file);
    };

    const handleTicketChange = (event) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            ticketPrices: value.split(',').map(ticketPrice => ticketPrice.trim())
        });
    };

    return (
        <div className={styles.parent}>
            <div className={styles.buttonContainer}>
                <button className={styles.back} onClick={handleRedirectHome}>Back To Home</button>
            </div>
            <div className={styles.header}>
                <h1>Create Historical Places</h1>
                <p>This page will allow you as a Tourism Governor to promote historical places effectively.</p>
            </div>
            <div className={styles.pageContainer}>
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <label className={styles.label}>Title</label>
                            <input
                                className={styles.input}
                                placeholder="Title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Description</label>
                            <input
                                className={styles.input}
                                placeholder="Description"
                                name="description"
                                type="text"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Location</label>
                            <input
                                className={styles.input}
                                placeholder="Location"
                                name="location"
                                type="text"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Ticket Prices</label>
                            <input
                                className={styles.input}
                                placeholder="Ticket Prices"
                                name="ticketPrices"
                                type="text"
                                value={formData.ticketPrices.join(", ")}
                                onChange={handleTicketChange}
                                required
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Opening Hours</label>
                            <input
                                className={styles.input}
                                placeholder="Opening Hours"
                                name="openingHours"
                                type="text"
                                value={formData.openingHours}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Tags</label>
                            <input
                                className={styles.input}
                                placeholder="Tags"
                                name="tags"
                                type="text"
                                value={formData.tags.join(", ")}
                                onChange={handleTagsChange}
                                required
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Pictures</label>
                            <input
                                className={styles.input}
                                placeholder="Pictures"
                                name="pictures"
                                type="file"
                                value={formData.pictures}
                                onChange={handleChangePicture}
                            />
                        </div>
                        <div className={styles.info}>
                            <p>*Ticket prices should be split using (commas ' , ')*</p>
                            <p>*Created/Updated Places will be displayed in your homepage*</p>
                            <p>*This is the default image for the place*</p>
                        </div>
                        <button className={styles.submit}>
                            {isUpdating ? "Update Historical Place" : "Create Historical Place"}
                        </button>
                        <div>
                            {showMessage && (
                                <div>
                                    {confirmMessage && <p className={styles.confirmMessage}>{confirmMessage}</p>}
                                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
                <div className={styles.imageContainer}>
                    <Image src={Sph} alt="Historical Place" className={styles.image} />
                </div>
            </div>
        </div>
    );
}

export default Historicalplaces;
