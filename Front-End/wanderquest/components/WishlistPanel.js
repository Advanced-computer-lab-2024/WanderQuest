'use client';
import React from 'react';
import { IoClose } from "react-icons/io5";
import Wishlist from './Wishlist';
import styles from '../Styles/WishlistPanel.module.css';

const WishlistPanel = ({ isOpen, onClose }) => {
    return (
        <div className={`${styles.wishlistContainer} ${isOpen ? styles.visible : ''}`}>
            <div className={`${styles.wishlistPanel} ${isOpen ? styles.open : ''}`}>
                <button 
                    className={styles.closeButton}
                    onClick={onClose}
                >
                    <IoClose />
                </button>
                <h2>My Wishlist</h2>
                <Wishlist />
            </div>
        </div>
    );
};

export default WishlistPanel; 