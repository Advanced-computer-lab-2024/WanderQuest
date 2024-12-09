'use client';
import React from 'react';
import { IoClose } from "react-icons/io5";
import Cart from './Cart';
import styles from '../Styles/CartPanel.module.css';

const CartPanel = ({ isOpen, onClose }) => {
    return (
        <div className={`${styles.cartContainer} ${isOpen ? styles.visible : ''}`}>
            <div className={`${styles.cartPanel} ${isOpen ? styles.open : ''}`}>
                <button 
                    className={styles.closeButton}
                    onClick={onClose}
                >
                    <IoClose />
                </button>
                <h2 className={styles.h2}>My Cart</h2>
                <Cart props={"Tourist"} />
            </div>
        </div>
    );
};

export default CartPanel;
