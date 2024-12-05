"use client";

import React, { useEffect, useState } from 'react';
import styles from '../styles/notifications.module.css';

const Notificationstourguide = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const response = await fetch('/api/notifications');
            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }
            const data = await response.json();
            setNotifications(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setLoading(false);
        }
    };

    const markAsSeen = async (id) => {
        try {
            const response = await fetch(`/api/notifications/${id}/markAsSeen`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error('Failed to mark notification as seen');
            }
            setNotifications((prev) =>
                prev.map((notification) =>
                    notification._id === id ? { ...notification, seen: true } : notification
                )
            );
        } catch (error) {
            console.error('Error marking notification as seen:', error);
        }
    };

    const markAllAsSeen = async () => {
        try {
            const response = await fetch('/api/notifications/markAllAsSeen', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: 'USER_ID' }), // Replace USER_ID dynamically
            });
            if (!response.ok) {
                throw new Error('Failed to mark all notifications as seen');
            }
            setNotifications((prev) =>
                prev.map((notification) => ({ ...notification, seen: true }))
            );
        } catch (error) {
            console.error('Error marking all notifications as seen:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    if (loading) return <p>Loading notifications...</p>;

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Notifications</h2>
            <ul className={styles.list}>
                {notifications.map((notification) => (
                    <li
                        key={notification._id}
                        className={`${styles.listItem} ${ 
                            notification.seen ? styles.seen : ''
                        }`}
                    >
                        <p className={styles.message}>{notification.message || 'No message provided'}</p>
                        <button
                            onClick={() => markAsSeen(notification._id)}
                            className={styles.button}
                            disabled={notification.seen}
                        >
                            Mark as Seen
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={markAllAsSeen} className={styles.markAllButton}>
                Mark All as Seen
            </button>
        </div>
    );
};

export default Notificationstourguide;

