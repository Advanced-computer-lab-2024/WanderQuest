'use client';

import styles from '../Styles/Creatprod.module.css';
import React, { useState } from 'react';

const Creatprod = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productPicture, setProductPicture] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const handleProductPictureChange = (e) => setProductPicture(e.target.files[0]);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async () => {
    if (!productName || !price || !description || !productPicture) {
      setError('All required fields must be filled');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('availableAmount', quantity || 0); // Default to 0 if not specified
    formData.append('documents', productPicture);

    try {
      const response = await fetch('http://localhost:4000/admin/addProduct', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include credentials for authentication
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add product');
      }

      const result = await response.json();
      setSuccess('Product added successfully');
      setError('');
      console.log('Product added:', result);
      // Reset form fields
      setProductName('');
      setPrice('');
      setQuantity('');
      setProductPicture(null);
      setDescription('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
      console.error('Error adding product:', error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Add Product</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <p>
        Product Name:{' '}
        <input
          className={styles.inputfield}
          type="text"
          value={productName}
          onChange={handleProductNameChange}
        />
      </p>
      <p>
        Price:{' '}
        <input
          className={styles.inputfield}
          type="number"
          value={price}
          onChange={handlePriceChange}
        />
      </p>
      <p>
        Available Quantity:{' '}
        <input
          className={styles.inputfield}
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </p>
      <p>
        Description:{' '}
        <input
          className={styles.inputfield}
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
      </p>
      <p>
        Product Picture:{' '}
        <input
          className={styles.inputpic}
          type="file"
          onChange={handleProductPictureChange}
        />
      </p>
      <button className={styles.button} onClick={handleSubmit}>
        ADD
      </button>
    </div>
  );
};

export default Creatprod;
