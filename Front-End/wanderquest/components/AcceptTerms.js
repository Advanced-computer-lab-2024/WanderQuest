"use client";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const AcceptTerms = () => {
    // Assuming you already have `termsAccepted` state from backend or props
    const [accepted, setAccepted] = useState(false);  // Assuming terms are not accepted initially
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Retrieve the token from cookies or localStorage
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt='));
        
        if (token) {
            const decodedToken = jwt.decode(token.split('=')[1]); // Decode the JWT
            if (decodedToken && decodedToken.userId) {
                setUserId(decodedToken.userId);  // Set the user ID from the decoded token
            }
        }
    }, []);

    const handleAccept = async () => {
        try {
            // Make a PATCH request to the backend to accept terms
            const response = await fetch(`http://localhost:4000/acceptTerms/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.message === "Terms and conditions accepted") {
                    setAccepted(true); // Set state to true after successful acceptance
                }
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error accepting terms:", error);
            alert("An error occurred while accepting the terms. Please try again.");
        }
    };

    return (
        !accepted && (
            <div className="terms-modal">
                <h2>Terms and Conditions</h2>
                <p>[Display terms and conditions here]</p>
                <label>
                    <input
                        type="checkbox"
                        onChange={() => setAccepted(!accepted)}
                    />
                    I accept the terms and conditions
                </label>
                <button onClick={handleAccept} disabled={!accepted}>
                    Confirm
                </button>
            </div>
        )
    );
};

export default AcceptTerms;
