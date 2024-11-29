import React, { useState } from 'react';
import styles from '../styles/complaints.module.css';

const ComplaintCard = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    }
    
    // Log the title state whenever it changes
    const handleSubmit = async () => {
        if (!title || !body || !date ) {
            console.error('All required fields must be filled');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:4000/tourist/fileComplaint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body, date }),
            credentials: 'include',
            });
    
            if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to file complaint');
            }
    
            const result = await response.json();
            console.log('Complaint filed successfully:', result);
        } catch (error) {
            console.error('Error filing a complaint:', error.message);
        }
        }


    return (
        <div className={styles.container}>
            <div className={styles.complaintCard}>
                <h1>Complaint Card</h1>
                <div className={styles.complaintInfo}>
                    <div>
                        <label>Title</label>
                        <input type="text" value={title} onChange={handleTitleChange} required />
                    </div>
                    <div>
                        <label>Body</label>
                        <input type="text" value={body} onChange={handleBodyChange} required />
                    </div>
                    <div>
                        <label>Date</label>
                        <input type="date" value ={date} onChange={handleDateChange}required />
                    </div>
                    <button className={styles.complaintButton} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ComplaintCard;

