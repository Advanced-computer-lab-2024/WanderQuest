'use client';
import React from 'react';
import { IoClose } from "react-icons/io5";
import Complaints from './Complaints';
import styles from '../Styles/ComplaintsPanel.module.css';
import ComplaintCard from './ComplaintCard';

const ComplaintsPanel = ({ isOpen, onClose }) => {
    return (
        <div className={`${styles.complaintsContainer} ${isOpen ? styles.visible : ''}`}>
            <div className={`${styles.complaintsPanel} ${isOpen ? styles.open : ''}`}>
                <button 
                    className={styles.closeButton}
                    onClick={onClose}
                >
                    <IoClose />
                </button>
                <ComplaintCard/>
                <h2>My Complaints</h2>
                <Complaints role='Tourist' />
            </div>
        </div>
    );
};

export default ComplaintsPanel; 