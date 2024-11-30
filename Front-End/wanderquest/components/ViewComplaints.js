'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter,useParams } from 'next/navigation';
import styles from '../styles/complaintsview.module.css';

const ViewComplaints = (props) => {
    const id = props.id;
    const role = props.role;
    console.log(id);
    const [complaint, setComplaint] = useState([]);
    const [status, setStatus] = useState('Pending'); // Default status
    const [loading, setLoading] = useState(true);
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replyText, setReplyText] = useState('');
    const router = useRouter();


    const handleReplyClick = () => {
        setShowReplyBox(true);
    };

    const handleSendReply = () => {
        // Send the reply to the database
        fetch(`http://localhost:4000/admin/reply/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reply: replyText }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Reply sent:', data);
                setShowReplyBox(false);
                setReplyText('');
            })
            .catch(error => console.error('Error sending reply:', error));
    };

    useEffect(() => {
        fetch(`http://localhost:4000/admin/complaints/${id}`,{credentials: 'include'})
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setComplaint(data);
                setStatus(data.status);
                console.log(data);
                setLoading(false);// Initialize filtered complaint with fetched data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setComplaint([]); 
                setLoading(false); // Reset filtered complaint on error
            });
    }, [status]);


    const toggleStatus = () => {
        const newStatus = status === 'Pending' ? 'Resolved' : 'Pending';

        // Update the status in the backend
        fetch(`http://localhost:4000/admin/markComplaint/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
            credentials: 'include',

        })
            .then(response => response.json())
            .then(data => setStatus(data.status))
            .catch(error => console.error('Error updating status:', error));
    };

    if (loading) {return<>
        <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script> 
        <dotlottie-player style={{
      width: '300px',
      height: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto'
    }}
      src="https://lottie.host/8558e83b-4d60-43da-b678-870ab799685b/uAzMRqjTlu.json" background="transparent" speed="1"  loop autoplay></dotlottie-player>
        </>}
    return (
        <div className={styles.container}>
            <h1>Complaint details</h1>
            {/* <div className={styles.container}>
                <div className={styles.priceFilter}>
                    <h3>Price Filter</h3>
                    <div>
                        <label>
                            Min Price:
                            <input
                            type="number"
                            className={styles.min}
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="0"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Max Price:
                            <input
                            type="number"
                            className={styles.max}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
  </div>                          placeholder="1000"
                       </button>     />
                        </label>
                    </div>
                    <div className={styles.slider}><label>min</label>
                        <input
                            type="range"
                            className={styles.rangeMin}
                            min="0"
                            max="10000"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            step="100"
                        /><label>max</label>
                        <input
                            type="range"
                            className={styles.rangeMax}
                            min="0"
                            max="10000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            step="100"
                        />
                    </div>
                    <button onClick={handlePriceFilter}>Apply Filter</button>
                </div>
            </div>
            <div className={styles.searchcom}>
                <input 
                    className={styles.complaintearch} 
                    onChange={(e) => setSearch(e.target.value)} 
                    type="text" 
                    placeholder='Enter your text' 
                />
                <button className={styles.searchbtn} onClick={handlesearch}>Search</button>
            </div> */}
                    <div className={styles.complaintCard}>
                        <div className={styles.complaintInfo}>
                            <div>
                                <h3>Title:</h3>
                                <p>{complaint.title}</p>
                            </div>
                            <div>
                                <h3>Body:</h3>
                                <p>{complaint.body}</p>
                            </div>
                            <div>
                                <h3>Date:</h3>
                                <p>{complaint.date}</p>
                            </div>
                            
                            <div >
                                <h3>Status:</h3>
                                <p className={status === 'Pending' ? styles.complaintRating : styles.complaintRating2}>{complaint.status}</p>
                            </div>

                            {role === 'Admin' &&(<div>
                                <h3>Complaint By:</h3>
                                <p>{complaint.complaintBy}</p>
                            </div>)}

                            {role === 'Tourist' &&(<div>
                                <h3>Reply:</h3>
                                <p>{complaint.reply}</p>
                            </div>)}

                            { role ==='Admin' && (<div className={styles.complaintButtons}>
                                <button onClick={handleReplyClick} className={styles.complaintButton}>
                                    Reply
                                </button>
                                <button className={styles.complaintButton} onClick={toggleStatus}>
                                    {status === 'Pending' || status === 'pending' ? 'Mark as Resolved' : 'Mark as Pending'}
                                </button>
                            </div>)}

                            {showReplyBox && (
                                    <div className={styles.replybox} >
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Type your reply here"
                                            className={styles.replyTextarea}
                                        />
                                    <button className={styles.complaintButton2} onClick={handleSendReply}>Send Reply</button>
                                    </div>
                )}   
                            
                        </div>
                    </div>
        </div>
    );
};

export default ViewComplaints;
