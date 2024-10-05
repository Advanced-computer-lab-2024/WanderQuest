'use client';
import React, { useEffect, useState } from 'react';
import styles from '../styles/products.module.css';

const Products = () => {
    const [products, setProduct] = useState([]);
    const role = "user";

    useEffect(() => {
        fetch('http://localhost:9000/products')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setProduct(data); 
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setProduct([]); 
            });
    }, []);

    return (
        <div className={styles.container}><div className={styles.searchcom}>
            <input className={styles.productsearch}type="text"placeholder='Enter your text' />
            <button className={styles.searchbtn}>Search</button>
            </div>
        {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
                <div className={styles.productCard} key={product.id}>
                    <img src={product.image} alt={product.name} className={styles.productImage} />
                    <div className={styles.productInfo}>
                        <h2>{product.name}</h2>
                        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                        <p>{product.description}</p>
                        <div className={styles.productRating}>
                            <strong>Rating: </strong>{product.ratings} / 5
                        </div>
                        <div className={styles.reviews}>
                            {product.reviews.map((review, index) => (
                                <div className={styles.review} key={index}>
                                    <strong>{review.user}:</strong> {review.comment} (Rating: {review.rating})
                                </div>
                            ))}
                            {role === "Admin" && (
                                <div className={styles.buttonContainer}>
                                    <button className={styles.productUpdate}>Update</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p>No products available.</p>
        )}
    </div>
    );
}

export default Products;
