import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NotificationButton = ({ role }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Determine API URL based on the role
    const getApiUrl = (endpoint) => {
        switch (role) {
            case "tourGuide":
                return `http://localhost:4000/tourGuide/${endpoint}`;
            case "tourist":
                return `http://localhost:4000/tourist/${endpoint}`;
            case "advertiser":
                return `http://localhost:4000/advertiser/${endpoint}`;
            case "seller":
                return `http://localhost:4000/seller/${endpoint}`;
            case "Admin":
                return `http://localhost:4000/admin/${endpoint}`;
            case "Tourism Governor":
                return `http://localhost:4000/governer/${endpoint}`;
            default:
                throw new Error("Invalid user role");
        }
    };

    // Fetch notifications
    const fetchNotifications = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get(getApiUrl("notifs"), {
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
            await axios.patch(getApiUrl("notifs"), {}, {
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
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                style={{
                    position: "relative",
                    backgroundColor: "transparent", // Transparent for modern look
                    border: "none", // Remove border
                    cursor: "pointer", // Pointer cursor
                    fontSize: "20px", // Adjust icon size
                    color: "#122c34", // Icon color
                    padding: "10px", // Spacing
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "color 0.3s ease", // Smooth hover effect
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1a6187")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#122c34")}
            >
                <FontAwesomeIcon icon={faBell} />
                {!loading && notifications.some((notif) => !notif.seen) && (
                    <span
                        style={{
                            position: "absolute",
                            top: "5px", // Adjust position relative to icon
                            right: "5px",
                            backgroundColor: "red",
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "bold",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add depth
                        }}
                    >
                        {notifications.filter((notif) => !notif.seen).length}
                    </span>
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
                            backgroundColor: "#1a6187",
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
