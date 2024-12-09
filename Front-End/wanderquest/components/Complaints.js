'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/complaints.module.css';
import { FaChevronDown } from 'react-icons/fa';
import { FaReply } from 'react-icons/fa';

const Complaints = (props) => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openComplaints, setOpenComplaints] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const url = 'http://localhost:4000/tourist/myComplaints';
                const response = await fetch(url, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setComplaints(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setComplaints([]);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    const toggleComplaint = (complaintId) => {
        setOpenComplaints(prev => ({
            ...prev,
            [complaintId]: !prev[complaintId]
        }));
    };

    if (loading) {
        return <>
            <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script>
            <dotlottie-player style={{
                width: '300px',
                height: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto'
            }}
                src="https://lottie.host/8558e83b-4d60-43da-b678-870ab799685b/uAzMRqjTlu.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
        </>
    }

    return (
        <div className={styles.complaintsContainer}>
            {Array.isArray(complaints) && complaints.length > 0 ? (
                complaints.map((complaint) => (
                    <div key={complaint._id} className={styles.complaintItem}>
                        <div 
                            className={styles.complaintHeader}
                            onClick={() => toggleComplaint(complaint._id)}
                        >
                            <h3>
                                {complaint.title}
                                {complaint.reply && (
                                    <span className={styles.hasReplyIcon}>
                                        <FaReply />
                                    </span>
                                )}
                            </h3>
                            <FaChevronDown 
                                className={`${styles.dropdownIcon} ${openComplaints[complaint._id] ? styles.open : ''}`}
                            />
                        </div>
                        
                        {openComplaints[complaint._id] && (
                            <div className={styles.complaintDetails}>
                                <p><strong>Description:</strong> {complaint.body}</p>
                                <p><strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> 
                                    <span className={complaint.status === 'Pending' ? 
                                        styles.statusPending : styles.statusResolved}>
                                        {complaint.status}
                                    </span>
                                </p>
                                
                                {complaint.reply && (
                                    <div className={styles.replySection}>
                                        <h4>Admin Response:</h4>
                                        <div className={styles.replyContent}>
                                            <p>{complaint.reply}</p>

                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p className={styles.emptyMessage}>No complaints available.</p>
            )}
        </div>
    );
};

export default Complaints;
