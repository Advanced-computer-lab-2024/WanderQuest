'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/complaints.module.css';
import { FaChevronDown } from 'react-icons/fa';

const Complaints = (props) => {
    const role = props.role;
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('');
    const [openComplaints, setOpenComplaints] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                let response;
                
                if (role === 'Admin') {
                    response = await fetch('http://localhost:4000/admin/complaints', {
                        credentials: 'include'
                    });
                } else if (role === 'Tourist') {
                    response = await fetch('http://localhost:4000/tourist/myComplaints', {
                        credentials: 'include'
                    });
                } else {
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setComplaints(data);
                setLoading(false);
            } catch (err) {
                console.log('Error fetching complaints:', err.message);
                setComplaints([]);
                setLoading(false);
            }
        };

        if (role === 'Admin' || role === 'Tourist') {
            fetchComplaints();
        } else {
            setLoading(false);
        }
    }, [role]);

    if (!role || (role !== 'Tourist' && role !== 'Admin')) {
        return null;
    }

    const handleViewComplaint = (complaintId) => {
        if (role === 'Admin') {
            router.push(`/admin/complaints/${complaintId}`);
        } else if (role === 'Tourist') {
            router.push(`/tourist/viewComplaint/${complaintId}`);
        }
    };

    const sortComplaintsByDate = (order) => {
        const sortedComplaints = [...complaints].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setComplaints(sortedComplaints);
        setSortOrder(order);
    };

    const filterComplaintsByStatus = (status) => {
        setFilterStatus(status);
    };

    const toggleComplaint = (complaintId) => {
        setOpenComplaints(prev => ({
            ...prev,
            [complaintId]: !prev[complaintId]
        }));
    };

    const filteredComplaints = Array.isArray(complaints) ? complaints.filter((complaint) => {
        return filterStatus ? complaint.status === filterStatus : true;
    }) : [];

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

    // Tourist View
    if (role === 'Tourist') {
        return (
            <div className={styles.complaintsContainer}>
                {Array.isArray(complaints) && complaints.length > 0 ? (
                    complaints.map((complaint) => (
                        <div key={complaint._id} className={styles.complaintItem} onClick={() => toggleComplaint(complaint._id)}>
                            <div className={styles.complaintHeader}>
                                <div className={styles.headerInfo}>
                                    <div className={styles.complaintInfo}>
                                        <h3>{complaint.title}</h3>
                                    </div>
                                </div>
                                <div className={styles.statusContainer}>
                                    <span>Status: </span>
                                    <span className={
                                        complaint.status === 'Pending' ? styles.statusPending : 
                                        styles.statusResolved
                                    }>
                                        {complaint.status}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.dropdownButton}>
                                <FaChevronDown 
                                    className={`${styles.dropdownIcon} ${openComplaints[complaint._id] ? styles.open : ''}`}
                                />
                            </div>
                            
                            {openComplaints[complaint._id] && (
                                <div className={styles.complaintDetails}>
                                    <div className={styles.detailsGrid}>
                                        <p><strong>Description:</strong> {complaint.body}</p>
                                        <p><strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}</p>
                                        {complaint.reply && (
                                            <div className={styles.replySection}>
                                                <h4>Admin Response:</h4>
                                                <div className={styles.replyContent}>
                                                    <p>{complaint.reply}</p>

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className={styles.emptyMessage}>No complaints available.</p>
                )}
            </div>
        );
    }
if (role === "Admin") {
    // Admin View (Original)
    return (
        <div className={styles.container}>
            <div className={styles.sortFilterControls}>
                <button onClick={() => sortComplaintsByDate('asc')}>Sort by Date Ascending</button>
                <button onClick={() => sortComplaintsByDate('desc')}>Sort by Date Descending</button>
                <select onChange={(e) => filterComplaintsByStatus(e.target.value)} value={filterStatus}>
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>

            <div className={styles.complaintsGrid}>
                {Array.isArray(filteredComplaints) && filteredComplaints.length > 0 ? (
                    filteredComplaints.map((complaint) => (
                        <div className={styles.complaintCard} key={complaint._id}>
                            <div className={styles.complaintInfo}>
                                <h2>{complaint.title}</h2>
                                <p>{complaint.body}</p>
                                <p>Date: {complaint.date}</p>
                                <div>
                                    <p>Status: </p>
                                    <p className={complaint.status === 'Pending' ? styles.complaintRating : styles.complaintRating2}>
                                        {complaint.status}
                                    </p>
                                </div>
                                <button className={styles.complaintButton} onClick={() => handleViewComplaint(complaint._id)}>
                                    View Complaint
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No complaints available.</p>
                )}
            </div>
        </div>
    );
}
};

export default Complaints;
