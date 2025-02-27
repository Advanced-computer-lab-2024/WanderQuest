'use client';
import React, { useEffect, useState, useCallback } from 'react';
import styles from '../Styles/Cart.module.css';
import { FaTrash } from 'react-icons/fa';

const Cart = (props) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = useCallback(() => {
        setLoading(true);
        fetch('http://localhost:4000/tourist/cart', { credentials: 'include' })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch cart');
                return res.json();
            })
            .then((data) => {
                setCart(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching cart:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchCart();

        // Listen for custom cart update events
        const handleCartUpdate = () => fetchCart();

        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, [fetchCart]);

    const handleRemove = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/tourist/cart/remove`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId: id }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to remove item from cart');
            }

            console.log('Product removed from cart successfully');
            window.dispatchEvent(new Event('cartUpdated')); // Trigger cart refresh
            fetchCart();
        } catch (error) {
            console.error('Error removing product:', error.message);
        }
    };

    if (loading) {
        return <p>Loading cart...</p>;
    }
    const imageMap = {
        'Mountain Hiking Boots': '/hikingboots.avif',
        'Yoga Mat': '/yogamat.jpg',
        'Travel Backpack': '/travelpack.jpg',
        'Passport Holder': '/passportholder.jpg',
        'Sunscreen': '/sunscreen.jpg',
        'Neck Pillow': '/neckpillow.jpg',
        'Travel Adapter': '/traveladapter.jpg',
        'Luggage Tag': '/traveltage.webp',
        'Packing Cubes': '/Packing Cubes.webp',
        'Hiking Gloves': '/hiking gloves.jpg',
        'Portable Charger': '/portable charger.webp',
        'Travel Guidebook': '/Travel Guidebook.webp',
        'Sunglasses': '/sunglasses.jpg',
        'Reusable Water Bottle': '/reusable water bottle.webp'
    };
   
    return (
        <div className={styles.cartContainer}>
            {cart.length > 0 ? (
                cart.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                        <img src={imageMap[item.name]} alt={item.name} className={styles.itemImage} />
                        <div className={styles.itemDetails}>
                            <h3 className={styles.productName}>{item.name}</h3>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <button
                            className={styles.removeButton}
                            onClick={() => handleRemove(item.id)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))
            ) : (
                <p className={styles.emptyMessage}>Your cart is empty.</p>
            )}

            <button onClick={() => (window.location.href = '/tourist/checkout')}>Checkout</button>
        </div>
    );
};

export default Cart;
