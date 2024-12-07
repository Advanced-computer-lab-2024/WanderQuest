'use client'
import { useState, useEffect } from 'react';
import Wishlist from '../../../../components/Wishlist';
import styles from '../../../../Styles/products.module.css';

const WishlistPage = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={styles.wishlistContainer}>
            <div className={`${styles.wishlistPanel} ${isOpen ? styles.open : ''}`}>
                <button 
                    className={styles.closeButton}
                    onClick={() => setIsOpen(false)}
                >
                    ×
                </button>
                <h2>My Wishlist</h2>
                <Wishlist />
            </div>
        </div>
    );
};

export default WishlistPage;