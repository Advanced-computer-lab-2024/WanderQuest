"use client";
import { useState, useEffect } from "react";
import styles from "../Styles/DeleteAccount.module.css"


const DeleteAcc = ({onDeleteSuccess }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [error, setError] = useState('');

    const handleAccountDeletion = async () => {
        try {
            const response = await fetch(`http://localhost:4000/authentication/requestAccountDeletion`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:"include",
            });

            if (response.ok) {
                const data = await response.json();
                alert("Your account has been deleted.");
                setIsModalVisible(false);
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to request account deletion");
                setTimeout(() => setError(""), 3000);
            }
        } catch (error) {
            console.error("Error requesting account deletion:", error);
            setError("An error occurred while requesting account deletion");
        }
    };

    return (
        <>
            <button
                className={styles.deleteButton}
                onClick={() => setIsModalVisible(true)}
            >
                Request Account Deletion
            </button>
            {isModalVisible && (
                <div className={styles.modaloverlay}>
                    <div className={styles.modal}>
                        <h3>Are you sure you want to delete your account?</h3>
                        <p>This action is irreversible.</p>
                        <div className={styles.modalbuttons}>
                            <button className={styles.confirmdelete} onClick={handleAccountDeletion}>
                                Yes, Delete
                            </button>
                            <button className={styles.canceldelete} onClick={() => setIsModalVisible(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
};

export default DeleteAcc;




