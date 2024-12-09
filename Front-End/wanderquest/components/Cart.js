'use client';
import React, { useEffect, useState, useCallback } from 'react';
import styles from '../Styles/Cart.module.css';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
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
            fetchCart();
        } catch (error) {
            console.error('Error removing product:', error.message);
        }
    };

    const handleQuantityChange = async (id, quantity) => {
        try {
            const response = await fetch('http://localhost:4000/tourist/cart/change', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId: id, quantity }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update quantity');
            }

            console.log('Quantity updated successfully');
            fetchCart();
        } catch (error) {
            console.error('Error updating quantity:', error.message);
        }
    };

    if (loading) {
        return <p>Loading cart...</p>;
    }

    return (
        <div className={styles.cartContainer}>
            {cart.length > 0 ? (
                cart.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                        <img src={item.picture} alt={item.name} className={styles.itemImage} />
                        <div className={styles.itemDetails}>
                            <h3 className={styles.productName}>{item.name}</h3>
                            <p className={styles.price}>${item.price.toFixed(2)}</p>
                            <div className={styles.quantityControls}>
                                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                                <input
                                    type="number"
                                    id={`quantity-${item.id}`}
                                    value={item.quantity}
                                    min="1"
                                    onChange={(e) =>
                                        handleQuantityChange(item.id, parseInt(e.target.value))
                                    }
                                />
                            </div>
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
        </div>
    );
};

export default Cart;
