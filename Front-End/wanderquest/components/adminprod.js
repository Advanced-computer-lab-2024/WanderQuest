'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../styles/products.module.css';


const adminprod = () => {
    
    const [products, setProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const role = "Admin";
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    // const [filteredProducts]

    const router = useRouter();

    const onUpdateClick = (id) => {
        router.push(`/editProduct/${id}`); // Programmatically navigate to the edit page
        console.log('Update product with id:', id);
    };

    const handlesearch = () => {
        const newprod = products.filter((prod) => {
            return search.toLowerCase() === '' || prod.name.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredProducts(newprod);
    };
    const clearsearch=()=>{
        setFilteredProducts(products);
    }
    const ClearFilters=()=>{
        setFilteredProducts(products);
    }
    const handlesortasc = () => {
        const editedprod = [...filteredProducts].sort((a, b) => a.price - b.price);
        setFilteredProducts(editedprod);
    };

    const handlesortdsc = () => {
        const editedprod = [...filteredProducts].sort((a, b) => b.price - a.price);
        setFilteredProducts(editedprod);
    };

    const handlePriceFilter = () => {
        const filtered = products.filter((product) => {
            const price = product.price;
            return (
                (minPrice === '' || price >= minPrice) &&
                (maxPrice === '' || price <= maxPrice)
            );
        });
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        fetch('http://localhost:4000/admin/products')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                console.log(data);
                setFilteredProducts(data); // Initialize filtered products with fetched data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setProduct([]); 
                setFilteredProducts([]); // Reset filtered products on error
            });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.priceFilter}>
                <h3>Price Filter</h3>
                <div>
                    <label>
                        Min Price:
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="0"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Max Price:
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="1000"
                        />
                    </label>
                </div>
                <button onClick={handlePriceFilter}>Apply Filter</button>
            </div>
            <button onClick={handlesortasc}>Sort by Price Asc</button>
            <button onClick={clearsearch}>clearsearch</button>
            <button onClick={ClearFilters}>ClearFilters</button>
            
            <button onClick={handlesortdsc}>Sort by Price Desc</button>
            <div className={styles.searchcom}>
                <input 
                    className={styles.productsearch} 
                    onChange={(e) => setSearch(e.target.value)} 
                    type="text" 
                    placeholder='Enter your text' 
                />
                <button className={styles.searchbtn} onClick={handlesearch}>Search</button>
            </div>
            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <div className={styles.productCard} key={product._id}>
                        <img src={product.picture} alt={product.name} className={styles.productImage} />
                        <div className={styles.productInfo}>
                            <h2>{product.name}</h2>
                            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                            <p>{product.description}</p>
                            <p>Seller: {product.seller}</p>
                            <div className={styles.productRating}>
                                <strong>Rating: </strong>{product.rating} / 5
                            </div>
                            <div className={styles.reviews}>
                                {product.reviews.map((review, index) => (
                                    <div className={styles.review} key={index}>
                                        <strong>{review.user}:</strong> {review.comment} (Rating: {review.rating})
                                    </div>
                                ))}
                                {role === "Admin" && (
                                    <button onClick={() => onUpdateClick(product._id)} className={styles.productUpdate}>
                                        Update
                                    </button>
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
};

export default adminprod;
