'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../styles/products.module.css';
import {motion,AnimatePresence} from 'framer-motion';


const Archive = (props) => {
    
    const [products, setProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const role = props.role;
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    // const [filteredProducts]
    const [loading, setLoading] = useState(true);
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
    const handleratingfilterasc=()=>{
        const sortedprod=[...filteredProducts].sort((a,b)=>a.rating-b.rating)
        setFilteredProducts(sortedprod);
    };
    const handleratingdsc=()=>{
        const sorteddsc=[...filteredProducts].sort((a,b)=>b.rating-a.rating);
        setFilteredProducts(sorteddsc);
    }
    

   
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

    const onUnarchiveClick = async (productId) => {
        try {
            const response = await fetch(`http://localhost:4000/admin/products/unarchive/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
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
                setFilteredProducts(data); 
                setLoading(false);// Initialize filtered products with fetched data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setProduct([]); 
                setFilteredProducts([]);
                setLoading(false); // Reset filtered products on error
            });
    }, []);
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
            <h1>Archived Products</h1>
            <button className={styles.productArchive} onClick={handlesortasc}>Sort by Price Asc</button>
            <button className={styles.productArchive} onClick={clearsearch}>clearsearch</button>
            <button className={styles.productArchive} onClick={ClearFilters}>ClearFilters</button>
            <button className={styles.productArchive} onClick={handleratingfilterasc}>sort by rating asc</button>
            <button className={styles.productArchive} onClick={handleratingdsc}>sort by rating dsc</button>
            <button className={styles.productArchive} onClick={handlesortdsc}>Sort by Price Desc</button>
            <div className={styles.container}>
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
        <div className={styles.slider}><label>min</label>
          <input
            type="range"
            className={styles.rangeMin}
            min="0"
            max="10000"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            step="100"
          /><label>max</label>
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
        <button onClick={handlePriceFilter}>Apply Filter</button>
      </div>
    </div>
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
                filteredProducts.filter(product => product.isArchived).map((product) => (
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
                                
                                <button 
                                    onClick={() => onUnarchiveClick(product._id)} 
                                    className={styles.productArchive}>
                                    Unarchive
                                </button>

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

export default Archive;
