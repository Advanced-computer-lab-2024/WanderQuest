'use client';
import React, { useEffect, useState, useCallback } from 'react';
import styles from '../Styles/Wishlist.module.css';
import { FaChevronDown } from 'react-icons/fa';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openItems, setOpenItems] = useState({});
    const [multiplier, setMultiplier] = useState(1);
    const [preferredCurrency, setPreferredCurrency] = useState('USD');

    useEffect(() => {
        const fetchPaymentMultiplier = async () => {
            try {
                const response = await fetch('http://localhost:4000/payment/getPaymentMultiplier', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Automatically include credentials (user session)
                });

                if (response.ok) {
                    const result = await response.json();
                    setMultiplier(result.multiplier);
                    setPreferredCurrency(result.currency);
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message}`);
                }
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        };
        fetchPaymentMultiplier();
    }, []);

    const handleRemove = useCallback(async (id) => {
        try {
            if (!id) throw new Error('Product ID is required');

            const response = await fetch(`http://localhost:4000/tourist/wishlist/remove/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to remove the product from wishlist');
            }

            const data = await response.json();
            console.log('Product removed successfully:', data);

            // Update the state to remove the product
            setWishlist((prevWishlist) => prevWishlist.filter((product) => product._id !== id));
        } catch (error) {
            console.error('Error removing product:', error.message);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:4000/tourist/wishlist', {
            credentials: 'include',
        })
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => {
                setWishlist(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const toggleDetails = (productId) => {
        setOpenItems(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    if (loading) {
        return (
            <>
                <script
                    src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
                    type="module"
                ></script>
                <dotlottie-player
                    style={{
                        width: '300px',
                        height: '300px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 'auto',
                    }}
                    src="https://lottie.host/8558e83b-4d60-43da-b678-870ab799685b/uAzMRqjTlu.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                ></dotlottie-player>
            </>
        );
    }

    return (
        <div className={styles.wishlistContainer}>
            {Array.isArray(wishlist) && wishlist.length > 0 ? (
                wishlist.filter((product) => !product.isArchived).map((product) => (
                    <div key={product._id}>
                        <div className={styles.wishlistItem}>
                            <div className={styles.leftSection}>
                                <img src={product.picture} alt={product.name} className={styles.itemImage} />
                                <div className={styles.basicInfo}>
                                    <h3 className={styles.productName}>{product.name}</h3>
                                    <p className={styles.price}>{(product.price * multiplier).toFixed(2)} {preferredCurrency}</p>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => handleRemove(product._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div className={styles.dropdownSection}>
                                <FaChevronDown
                                    className={`${styles.dropdownIcon} ${openItems[product._id] ? styles.open : ''}`}
                                    onClick={() => toggleDetails(product._id)}
                                />
                            </div>
                        </div>
                        <div className={`${styles.detailsPanel} ${openItems[product._id] ? styles.open : ''}`}>
                            <div className={styles.detailsGrid}>
                                <p className={styles.detailItem}><strong>Seller:</strong> {product.seller}</p>
                                <p className={styles.detailItem}><strong>Available:</strong> {product.availableAmount}</p>
                                <p className={styles.detailItem}><strong>Rating:</strong> {product.rating} / 5</p>
                                <p className={styles.detailItem}><strong>Description:</strong> {product.description}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className={styles.emptyMessage}>No products available in Wishlist.</p>
            )}
        </div>
    );
};

export default Wishlist;
