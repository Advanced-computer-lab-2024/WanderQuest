'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../styles/products.module.css';
import AddRating from './AddRating';
import AddComment from './AddComment';
import { motion } from "framer-motion";
import foot from './foot';

// Material UI components
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Footer from './Footer';

const travelProducts = [
    { name: "Mountain Hiking Boots", description: "Durable and comfortable boots designed for rugged mountain trails." },
    { name: "Travel Backpack", description: "A versatile and spacious backpack perfect for carrying all your essentials." },
    { name: "Passport Holder", description: "A sleek, protective holder to keep your passport safe during your travels." },
    { name: "Neck Pillow", description: "Soft and ergonomic neck pillow to keep you comfortable during long flights." },
    { name: "Travel Adapter", description: "A compact adapter to ensure your devices work in different countries." },
    { name: "Luggage Tag", description: "Easily identifiable tags for your luggage to prevent mix-ups." },
    { name: "Packing Cubes", description: "Organize your clothes and accessories neatly with these space-saving packing cubes." },
    { name: "Hiking Gloves", description: "Protect your hands with these durable gloves designed for outdoor activities." },
    { name: "Portable Charger", description: "Keep your devices powered on-the-go with this compact portable charger." },
    { name: "Travel Guidebook", description: "A detailed guidebook offering tips, attractions, and useful travel advice." },
    { name: "Sunglasses", description: "Stylish and UV-protective sunglasses to keep your eyes safe and comfortable." },
    { name: "Reusable Water Bottle", description: "Eco-friendly and durable water bottle to stay hydrated on your travels." },
    { name: "Sunscreen", description: "Broad-spectrum sunscreen to protect your skin from harmful UV rays." },
    { name: "Sunscreen", description: "Broad-spectrum sunscreen to protect your skin from harmful UV rays." }
];

const images = [
    '/hikingboots.avif',
    '/yogamat.jpg',
    '/travelpack.jpg',
    '/passportholder.jpg',
    '/sunscreen.jpg',
    '/neckpillow.jpg',
    '/traveladapter.jpg',
    '/traveltage.webp',
    '/Packing Cubes.webp',
    '/hiking gloves.jpg',
    '/portable charger.webp',
    '/Travel Guidebook.webp',
    '/sunglasses.jpg',
    '/reusable water bottle.webp'
];

const i=0;
const labels = {
    0.5: 'Useless',
    1: 'Useless',
    1.5: 'Poor',
    2: 'Poor',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good',
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
    const [quantity, setQuantity] = useState(1);


    

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
            credentials: 'include',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                // Add image paths to products
                const productsWithImages = data.map((product, index) => {
                    const imageIndex = index % images.length; // Use modulo to cycle through images
                    return {
                        ...product,
                        imagePath: images[imageIndex]
                    };
                });
                setProduct(productsWithImages);
                setFilteredProducts(productsWithImages);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setProduct([]);
                setFilteredProducts([]);
                setLoading(false);
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
    const addCart = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/tourist/cart/add/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ quantity: 1 })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add to cart');
            }
    
            console.log('Successfully added to Cart');
            
            // Notify cart component to refresh
            window.dispatchEvent(new Event('cartUpdated'));
    
            alert('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding item to cart:', error.message);
            alert('Failed to add product to cart');
        }
    };
    
    
    
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
    <div className={styles.body}>
    
    <motion.div initial={{ opacity: 0, y: 20,x:30 }} animate={{ opacity: 1 }} className={styles.searchContainer}>
            <input
                        className={styles.productsearch}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search for products..."
                    /> <div className={styles.sortcontainer}>
                        <select className={styles.sort} onChange={(e) => { const value = e.target.value; if(value === 'asc') handlesortasc(); else if(value === 'desc') handlesortdsc(); else if(value === 'ratingAsc') handleratingfilterasc(); else if(value === 'ratingDesc') handleratingdsc(); }}>
                            <option value="asc">Sort by Price Asc</option>
                            <option value="desc">Sort by Price Desc</option>
                            <option value="ratingAsc">Sort by Rating Asc</option>
                            <option value="ratingDesc">Sort by Rating Desc</option>
                        </select>
                        </div>
                        </motion.div>
        <div className={styles.filterSection}>
            <div className={styles.pageLayout}>
                    <div className={styles.sidebar}>
                     <h1>Filters</h1>

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
                                .map((product, index) => (
                                    <motion.div
                                        className={styles.productCard}
                                        key={product._id}
                                        initial={{ 
                                            opacity: 0, 
                                            y: 50,
                                            scale: 0.9
                                        }}
                                        animate={{ 
                                            opacity: 1, 
                                            y: 0,
                                            scale: 1
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.2,
                                            ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smooth animation
                                        }}
                                        whileHover={{
                                            scale: 1.03,
                                            transition: { duration: 0.2 }
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <motion.div 
                                            className={styles.productImageContainer}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                delay: index * 0.2 + 0.3,
                                                duration: 0.5
                                            }}
                                        >
                                            <motion.img
                                                src={product.imagePath}
                                                alt={product.name}
                                                className={styles.productImage}
                                                initial={{ scale: 1 }}
                                                whileHover={{ 
                                                    scale: 1.1,
                                                    transition: {
                                                        duration: 0.3,
                                                        ease: "easeOut"
                                                    }
                                                }}
                                            />
                                        </motion.div>
                                        <motion.div 
                                            className={styles.productInfo}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: index * 0.2 + 0.4,
                                                duration: 0.5
                                            }}
                                        >
                                            <h2 style={{ color: 'black',marginBottom: '-2px' }} className={styles.productTitle}>{product.name}</h2>
                                            <span className={styles.productDescription}>{product.description}</span>
                                            <hr></hr>
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
                                                    
                                                    {/* <span className={styles.sellerName}>{product.seller}</span> */}
                                                </div>
                                            </div>

                        
                        
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


                        {role === "Admin" && (
                            <div className={styles.adminActions}>
                                <p>Sales: {product.sales}</p>
                                <button onClick={() => onUpdateClick(product._id)} className={styles.productArchive}>
                                    Edit
                                </button>
                                <button onClick={() => onArchiveClick(product._id)} className={styles.productArchive}>
                                    Archive
                                </button>
                            </div>
                        )}

                      
                                                     
                        {role === "Tourist" && (
                            <motion.div 
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                    gap: '10px'
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    delay: index * 0.2 + 0.5,
                                    duration: 0.5,
                                    ease: [0.43, 0.13, 0.23, 0.96]
                                }}
                            >
                                <motion.button 
                                    className={styles.productArchive} 
                                    onClick={() => addWishlist(product._id)}
                                    whileHover={{ 
                                        scale: 1.05, 
                                        backgroundColor: "#333"
                                    }}
                                    whileTap={{ 
                                        scale: 0.95,
                                        transition: {
                                            duration: 0.1
                                        }
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                        delay: index * 0.2 + 0.6,
                                        duration: 0.4,
                                        ease: [0.43, 0.13, 0.23, 0.96]
                                    }}
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '4px', 
                                        padding: '6px 12px', 
                                        fontSize: '0.9rem', 
                                        minHeight: '32px',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        flex: 1
                                    }}
                                >
                                    <motion.svg 
                                        fill="#ffffff"
                                        height="15px"
                                        width="15px"
                                        version="1.1" 
                                        viewBox="0 0 611.997 611.997" 
                                        stroke="#ffffff"
                                        initial={{ rotate: -180, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        transition={{ 
                                            delay: index * 0.2 + 0.7,
                                            duration: 0.5
                                        }}
                                    >
                                        <g>
                                            <path d="M549.255,384.017h-50.692v-50.694c0-21.132-17.134-38.264-38.262-38.264c-21.138,0-38.266,17.132-38.266,38.264v50.694 h-50.697c-21.13,0-38.262,17.132-38.262,38.264c0,21.134,17.134,38.264,38.262,38.264h50.697v50.697 c0,21.13,17.13,38.264,38.266,38.264c21.13,0,38.262-17.134,38.262-38.264v-50.697h50.692c21.138,0,38.262-17.13,38.262-38.264 C587.519,401.151,570.394,384.017,549.255,384.017z"></path>
                                            <path d="M383.77,498.809h-12.432c-42.198,0-76.526-34.33-76.526-76.528s34.328-76.528,76.526-76.528h12.432v-12.43 c0-42.198,34.33-76.528,76.53-76.528c42.198,0,76.526,34.33,76.526,76.528v12.43h12.428c5.073,0,10.028,0.508,14.827,1.454 c66.899-77.109,63.762-194.319-9.515-267.606c-37.102-37.1-86.429-57.533-138.896-57.533c-39.544,0-77.476,11.685-109.659,33.39 c-32.185-21.705-70.117-33.39-109.659-33.39c-52.464,0-101.791,20.433-138.896,57.535 c-76.609,76.617-76.609,201.284,0.002,277.904l215.831,215.829c2.226,2.222,4.583,4.463,7.009,6.664 c7.293,6.619,16.501,9.93,25.716,9.93c9.198,0,18.396-3.301,25.684-9.903c2.448-2.216,4.826-4.477,7.069-6.72l46.584-46.582 c-1.033-5.002-1.577-10.181-1.577-15.482v-12.432H383.77z"></path>
                                        </g>
                                    </motion.svg>
                                    Add to Wishlist
                                </motion.button>

                                <motion.button 
                                    className={styles.productArchive} 
                                    onClick={() => addCart(product._id)}
                                    whileHover={{ 
                                        scale: 1.05, 
                                        backgroundColor: "#333"
                                    }}
                                    whileTap={{ 
                                        scale: 0.95,
                                        transition: {
                                            duration: 0.1
                                        }
                                    }}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                        delay: index * 0.2 + 0.7,
                                        duration: 0.4,
                                        ease: [0.43, 0.13, 0.23, 0.96]
                                    }}
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '4px', 
                                        padding: '6px 12px', 
                                        fontSize: '0.9rem', 
                                        minHeight: '32px',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        flex: 1
                                    }}
                                >
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="20px"
                                        width="20px"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ 
                                            delay: index * 0.2 + 0.8,
                                            duration: 0.5,
                                            type: "spring",
                                            stiffness: 200
                                        }}
                                    >
                                        <path d="M7 4h-2c-.55 0-1 .45-1 1s.45 1 1 1h2l3.6 7.59-1.35 2.45c-.16.29-.25.63-.25.96 0 1.11.89 2 2 2h9c.55 0 1-.45 1-1s-.45-1-1-1h-8.68c-.09 0-.17-.07-.22-.16l.03-.03 1.1-1.96h5.83c.38 0 .72-.21.89-.55l3.58-6.42c.2-.36.08-.8-.24-1.05-.32-.25-.77-.24-1.09.01l-3.06 5.48h-5.73l-3.3-6.92c-.14-.3-.44-.51-.78-.51zm1.79 14.5c-.96 0-1.79.82-1.79 1.79s.83 1.79 1.79 1.79c.96 0 1.79-.82 1.79-1.79s-.83-1.79-1.79-1.79zm11.92 0c-.96 0-1.79.82-1.79 1.79s.83 1.79 1.79 1.79c.96 0 1.79-.82 1.79-1.79s-.83-1.79-1.79-1.79z"></path>
                                    </motion.svg>
                                    Add to Cart
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
              
            
        ))
) : (
    <p>No products available.</p>
)}

                    </div>
                </div>
            </div>
        </div>
    );

};

export default Products;
