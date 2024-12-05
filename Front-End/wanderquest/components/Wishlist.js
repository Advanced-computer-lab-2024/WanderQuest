'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../styles/products.module.css';

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('');
    const router = useRouter();


    const handleRemove = async (id) => {
        try {
            
            // Check if id is provided
            if (!id) {
                throw new Error('Product ID is required');
            }
    
            // Send DELETE request to the API
            const response = await fetch(`http://localhost:4000/tourist/wishlist/remove/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:'include',
            });
    
            // Handle response
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to remove the product from wishlist');
            }
    
            const data = await response.json();
            console.log('Product removed successfully:', data);
        } catch (error) {
            console.error('Error removing product:', error.message);
        }
    };
    


        useEffect(() => {
            fetch('http://localhost:4000/tourist/wishlist', {
                credentials: 'include' 
            })
                .then((res) => {
                    if (!res.ok) {
                        console.log(res);
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then((data) => {
                    setWishlist(data);
                    console.log(data);
                    setLoading(false); 
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setWishlist([]);
                    setLoading(false); 
                });
        }, [handleRemove]);



        
    if (loading) {return<>
        <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script> 
        <dotlottie-player style={{
      width: '300px',
      height: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto'
    }}
      src="https://lottie.host/8558e83b-4d60-43da-b678-870ab799685b/uAzMRqjTlu.json" background="transparent" speed="1"  loop autoplay></dotlottie-player>
        </>}
    return (
        <div className={styles.container}>
            {Array.isArray(wishlist) && wishlist.length > 0 ? (
                wishlist.filter(product => !product.isArchived).map((product) => (
                    <div className={styles.productCard} key={product._id}>
                        <img src={product.picture} alt={product.name} className={styles.productImage} />
                        <div className={styles.productInfo}>
                            <h2>{product.name}</h2>
                            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                            <p>{product.description}</p>
                            <p>Seller: {product.seller}</p>
                            <p>Available Quantity: {product.availableAmount}</p>
                            <div className={styles.productRating}>
                                <strong>Rating: </strong>{product.rating} / 5
                            </div>
                            <button className={styles.deleteButton} onClick={() => handleRemove(product._id)}>
                                Remove from Wishlist
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No products available in Wishlist.</p>
            )}
        </div>
    );
};

export default Wishlist;
