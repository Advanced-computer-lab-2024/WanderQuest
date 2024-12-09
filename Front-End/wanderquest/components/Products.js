'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../styles/products.module.css';
import AddRating from './AddRating';
import AddComment from './AddComment';
import { motion } from "framer-motion";


import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};
const Products = ({ role, refreshWishlist }) => {

    const [products, setProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [ratings, setRatings] = useState({});
    const [comments, setComments] = useState({});  // State to hold comments for each product
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [productPicture, setProductPicture] = useState(null);
    const [multiplier, setMultiplier] = useState(1);
    const [preferredCurrency, setPreferredCurrency] = useState('USD');

    useEffect(() => {
        const storedMultiplier = localStorage.getItem('multiplier');
        let multiplier = 1;
        console.log('Stored Multiplier:', storedMultiplier);
        if (storedMultiplier) {
            console.log('Setting Multiplier:', storedMultiplier);
            setMultiplier(storedMultiplier);
        }

        const preferredCurrency = localStorage.getItem('preferredCurrency') || 'USD';
        console.log('Preferred Currency:', preferredCurrency);
        if (preferredCurrency) {
            setPreferredCurrency(preferredCurrency);
        }
    }, []);


    const handleProductPictureChange = (e) => setProductPicture(e.target.files[0]);

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
    const clearsearch = () => {
        setFilteredProducts(products);
    }
    const ClearFilters = () => {
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
    const handleratingfilterasc = () => {
        const sortedprod = [...filteredProducts].sort((a, b) => a.rating - b.rating)
        setFilteredProducts(sortedprod);
    };
    const handleratingdsc = () => {
        const sorteddsc = [...filteredProducts].sort((a, b) => b.rating - a.rating);
        setFilteredProducts(sorteddsc);
    }


    useEffect(() => {

        handlesearch();
    }, [search]);
    const handlePriceFilter = () => {
        const filtered = products.filter((product) => {
            const price = product.price * multiplier;
            return (
                (minPrice === '' || price >= minPrice) &&
                (maxPrice === '' || price <= maxPrice)
            );
        });
        setFilteredProducts(filtered);
    };

    const updateRating = async (productId, newRating) => {
        console.log(`Product ID: ${productId}, New Rating: ${newRating}`);

        try {
            const response = await fetch(`http://localhost:4000/tourist/rateProduct/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating: newRating }),  // touristId will be inferred from credentials
                credentials: 'include', // Automatically include tourist ID from session/cookie
            });

            if (response.ok) {
                const result = await response.json();
                alert('Rating updated successfully!');
                setRatings((prevRatings) => ({
                    ...prevRatings,
                    [productId]: newRating,
                }));
            } else {
                const errorData = await response.json();
                alert(`Failed to update rating: ${errorData.error}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const addComment = async (productId, comment) => {
        console.log("comments", comments);

        try {
            const response = await fetch(`http://localhost:4000/tourist/reviewProduct/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    review: comment, // touristId will be inferred from credentials
                }),
                credentials: 'include', // Automatically include tourist ID from session/cookie
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                // Optionally: Update product list to reflect new comment
                const updatedProducts = products.map(product =>
                    product._id === productId ? result.product : product
                );
                setProduct(updatedProducts);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const onArchiveClick = async (productId) => {
        try {
            const response = await fetch(`http://localhost:4000/admin/products/archive/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Automatically include credentials (admin session)
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);  // Notify the user of success
                setFilteredProducts(filteredProducts.filter(product => product._id !== productId));
                setProduct(products.filter(product => product._id !== productId));
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    useEffect(() => {
        fetch('http://localhost:4000/tourist/products', {
            credentials: 'include', // Include admin credentials
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                console.log(data);
                setFilteredProducts(data);
                setLoading(false); // Initialize filtered products with fetched data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setProduct([]);
                setFilteredProducts([]);
                setLoading(false); // Reset filtered products on error
            });
    }, []);

    const addWishlist = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/tourist/wishlist/add/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add to wishlist');
            }

            const result = await response.json();
            console.log('Successfully added to wishlist', result);
            if (refreshWishlist) {
                refreshWishlist(); // Call the refresh function when product is added
            }
            alert('Product added to wishlist successfully!');
        } catch (error) {
            console.error('Error adding item to wishlist:', error.message);
            alert('Failed to add product to wishlist');
        }
    };

    if (loading) {
        return <>
            <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script>
            <dotlottie-player style={{
                width: '300px',
                height: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto'
            }}
                src="https://lottie.host/8558e83b-4d60-43da-b678-870ab799685b/uAzMRqjTlu.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
        </>
    }
    return (
        <>
            <img src="/prod.png" className={styles.travelplan} alt="iti" />
            <motion.div
                className={styles.searchcom}
                initial={{ y: 20 }}
                transition={{ duration: 1 }}
            >
                <input
                    className={styles.productsearch}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search for products..."
                />
            </motion.div>
            <div className={styles.filterSection}>
                <div className={styles.pageLayout}>
                    <div className={styles.sidebar}>
                        <h1>Sorting</h1>
                        <button className={styles.productArchive} onClick={handlesortasc}>Sort by Price Asc</button>
                        <button className={styles.productArchive} onClick={handlesortdsc}>Sort by Price Desc</button>
                        <button className={styles.productArchive} onClick={handleratingfilterasc}>Sort by Rating Asc</button>
                        <button className={styles.productArchive} onClick={handleratingdsc}>Sort by Rating Desc</button>


                        <div className={styles.priceFilter}>
                            <h3>Price Filter</h3>
                            <div>
                                <label>
                                    Min Price:
                                    <input
                                        type="number"
                                        className={styles.min}
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
                                        className={styles.max}
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        placeholder="1000"
                                    />
                                </label>
                            </div>
                            <div className={styles.slider}>
                                <label>Min</label>
                                <input
                                    type="range"
                                    className={styles.rangeMin}
                                    min="0"
                                    max="10000"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    step="100"
                                />
                                <label>Max</label>
                                <input
                                    type="range"
                                    className={styles.rangeMax}
                                    min="0"
                                    max="10000"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    step="100"
                                />
                            </div>
                            <button style={{ margin: '5px' }} onClick={handlePriceFilter}>Apply Filter</button>
                            <button style={{ margin: '5px' }} className={styles.productArchive} onClick={ClearFilters}>Clear Filters</button>
                        </div>
                    </div>

                    {/* <div className={styles.searchcom}>
                    <input
                        className={styles.productsearch}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Enter your text"
                    />
                </div> */}
                    <div className={styles.cardscontainer}>
                        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                            filteredProducts
                                .filter(product => !product.isArchived)
                                .map((product) => (
                                    <div className={styles.productCard} key={product._id}>
                                        <div className={styles.productImageContainer}>
                                            <img
                                                src={product.picture}
                                                alt={product.name}
                                                className={styles.productImage}
                                            />
                                        </div>
                                        <div className={styles.productInfo}>
                                            <h2 className={styles.productTitle}>{product.name}</h2>

                                            <div className={styles.productMeta}>
                                                <div className={styles.priceAndStock}>
                                                    <span className={styles.productPrice}>
                                                        {(product.price * multiplier).toFixed(2)} {preferredCurrency}
                                                    </span>
                                                    <span className={styles.stockInfo}>
                                                        {product.availableAmount > 0
                                                            ? `${product.availableAmount} in stock`
                                                            : "Out of stock"}
                                                    </span>
                                                </div>

                                                <div className={styles.sellerInfo}>
                                                    <span className={styles.sellerLabel}>Sold by:</span>
                                                    <span className={styles.sellerName}>{product.seller}</span>
                                                </div>
                                            </div>

                                            <p className={styles.productDescription}>{product.description}</p>

                                            <div className={styles.productRating}>
                                                {product.rating && product.rating > 0 ? (
                                                    <div className={styles.ratingContainer}>
                                                        <Rating
                                                            name="text-feedback"
                                                            value={product.rating}
                                                            readOnly
                                                            precision={0.5}
                                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                        />
                                                        <span className={styles.ratingLabel}>{labels[product.rating]}</span>
                                                    </div>
                                                ) : "No rating yet"}
                                            </div>
                                        </div>
                                    </div>


                                ))
                        ) : (
                            <p>No products available.</p>
                        )}

                    </div>
                </div>
            </div>

        </>
    );

};

export default Products;
