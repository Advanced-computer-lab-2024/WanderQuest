import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch notifications
    const fetchNotifications = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get("http://localhost:4000/tourist/notifs", {
                withCredentials: true, // Include cookies if required
            });
            setNotifications(data);
        } catch (err) {
            setError("Failed to load notifications.");
        } finally {
            setLoading(false);
        }
    };

    // Mark all as read
    const markAllAsRead = async () => {
        try {
            await axios.patch("http://localhost:4000/notifs", {}, {
                withCredentials: true, // Include cookies if required
            });
            setNotifications((prev) =>
                prev.map((notif) => ({ ...notif, seen: true }))
            );
        } catch (err) {
            setError("Failed to mark notifications as read.");
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    return (
        <div style={{ position: "relative" }}>
            {/* Notification Button */}
            <button onClick={() => setIsOpen((prev) => !prev)} style={{ position: "relative" }}>
                Notifications
                {!loading && notifications.some((notif) => !notif.seen) && (
                    <span
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            backgroundColor: "red",
                            borderRadius: "50%",
                            width: "8px",
                            height: "8px",
                        }}
                    ></span>
                )}
            </button>

            {/* Notification Popup */}
            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        width: "300px",
                        maxHeight: "400px",
                        overflowY: "auto",
                        border: "1px solid #ccc",
                        backgroundColor: "white",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        borderRadius: "4px",
                        zIndex: 1000,
                    }}
                >
                    <div style={{ padding: "10px" }}>
                        {loading && <p>Loading...</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {!loading && notifications.length === 0 && <p>No notifications.</p>}
                        {!loading && notifications.map((notif) => (
                            <div
                                key={notif._id}
                                style={{
                                    padding: "8px",
                                    marginBottom: "4px",
                                    backgroundColor: notif.seen ? "#f9f9f9" : "#e6f7ff",
                                    borderRadius: "4px",
                                }}
                            >
                                <p>{notif.message}</p>
                                <small style={{ color: "#999" }}>{new Date(notif.createdAt).toLocaleString()}</small>
                            </div>
                        ))}
                    </div>
                    {/* Mark All as Read Button */}
                    <button
                        onClick={markAllAsRead}
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "0 0 4px 4px",
                            cursor: "pointer",
                        }}
                    >
                        Mark All as Read
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationButton;
