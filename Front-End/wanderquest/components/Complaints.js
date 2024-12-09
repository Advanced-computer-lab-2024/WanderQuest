'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../styles/complaints.module.css';

const Complaints = (props) => {

    const role = props.role;
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('');
    const router = useRouter();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:4000/authentication/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Automatically include credentials (user session)
                });

                if (response.ok) {
                    const result = await response.json();
                    setUser(result);
                } else {
                    const errorData = await response.json();
                    setUser({});
                }
            } catch (error) {
                setUser({});
            }
        };

        fetchUserData();
    }, []);



    if (user && user.role === 'Admin') {
        useEffect(() => {
            fetch('http://localhost:4000/admin/complaints', {
                credentials: 'include'
            })
                .then((res) => {
                    if (!res.ok) {
                        console.log(res);
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then((data) => {
                    setComplaints(data);
                    console.log(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setComplaints([]);
                    setLoading(false);
                });
        }, []);
    } else if (user && user.role === 'tourist') {
        useEffect(() => {
            fetch('http://localhost:4000/tourist/myComplaints', {
                credentials: 'include'
            })
                .then((res) => {
                    if (!res.ok) {
                        console.log(res);
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then((data) => {
                    setComplaints(data);
                    console.log(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setComplaints([]);
                    setLoading(false);
                });
        }, []);
    }


    const handleViewComplaint = (complaintId) => {
        if (user && user.role === 'Admin') {
            router.push(`/admin/complaints/${complaintId}`);
        } else if (user && user.role === 'tourist') {
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

    const filteredComplaints = complaints.filter((complaint) => {
        return filterStatus ? complaint.status === filterStatus : true;
    });

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
        <div className={styles.container}>
            {role === 'Admin' && (<div className={styles.sortFilterControls}>
                <button onClick={() => sortComplaintsByDate('asc')}>Sort by Date Ascending</button>
                <button onClick={() => sortComplaintsByDate('desc')}>Sort by Date Descending</button>
                <select onChange={(e) => filterComplaintsByStatus(e.target.value)} value={filterStatus}>
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>)}
            {Array.isArray(filteredComplaints) && filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                    <div className={styles.complaintCard} key={complaint._id}>
                        <div className={styles.complaintInfo}>
                            <h2>{complaint.title}</h2>
                            <p>{complaint.body}</p>
                            <p>Date: {complaint.date}</p>
                            <div>
                                <p>Status: </p>
                                <p className={complaint.status === 'Pending' ? styles.complaintRating : styles.complaintRating2}>{complaint.status}</p>
                            </div>
                            <button className={styles.complaintButton} onClick={() => handleViewComplaint(complaint._id)}>View Complaint</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No complaints available.</p>
            )}
        </div>
    );
};

export default Complaints;
