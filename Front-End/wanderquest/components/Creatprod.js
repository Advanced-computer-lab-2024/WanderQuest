import styles from '../Styles/Creatprod.css'
import Products from './Products'
import React, { useState } from 'react';
import { useRef } from 'react';

const Creatprod = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productPicture, setProductPicture] = useState(null);
  const [productPicturePreview, setProductPicturePreview] = useState(null);
  const [description, setDescription] = useState('');

  const fileInputRef = useRef(null);

  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const handleProductPictureChange = (e) => {
    const file = e.target.files[0];
    setProductPicture(file);
    setProductPicturePreview(URL.createObjectURL(file));
  };
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('name', productName);
    formData.append('price', price);
    formData.append('availableAmount', quantity);
    formData.append('picture', productPicture);
    formData.append('description', description);
    formData.append('seller', '6702b523fed809576ad64eb8'); // Replace with dynamic ID

    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    // if (!productName || !price || !quantity || !productPicture || !description) {
    //   alert('Please fill out all fields');
    //   return;
    // }
    if (price <= 0 || quantity <= 0) {
      alert('Price and quantity must be positive numbers');
      return;
    }

    

    try {
      const response = await fetch('http://localhost:4000/admin/addProduct', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to add product');
        return;
      }

      const result = await response.json();
      console.log('Product added successfully:', result);
      alert('Product added successfully!');

      // Clear form
      setProductName('');
      setPrice('');
      setQuantity('');
      setProductPicture(null);
      setProductPicturePreview(null);
      setDescription('');
      fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error adding product:', error.message);
      alert('An error occurred while adding the product. Please try again.');
    }
  };

  return (
    <div className='container'>
      <h1>Add Product</h1>
      <label>Product Name</label>
      <input className='inputfield' type='text' value={productName} onChange={handleProductNameChange} />
      <br/>
      <label>Price</label>
      <input className='inputfield' type='number' value={price} onChange={handlePriceChange} />
      <br/>
      <label>Available Quantity</label>
      <input className='inputfield' type='number' value={quantity} onChange={handleQuantityChange} />
      <br/>
      <label>Description</label>
      <input className='inputfield' type='text' value={description} onChange={handleDescriptionChange} />
      <br/>
      <label>Product Picture</label>
      <input className='inputpic' type='file' onChange={handleProductPictureChange} ref={fileInputRef} />
      <br/>
      {productPicturePreview && <img src={productPicturePreview} alt="Preview" style={{ width: '150px', height: '150px', marginTop: '10px' }} />}
      <br/>
      <button className='button' onClick={handleSubmit}>ADD</button>
    </div>
  );
};

export default Creatprod;
