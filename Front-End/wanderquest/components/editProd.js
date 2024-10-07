import styles from '../Styles/Creatprod.css'
import Products from './Products'
import React, { useState } from 'react';

const editProd = (id) => {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productPicture, setProductPicture] = useState(null);
  const [description, setDescription] = useState('');

  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const handleProductPictureChange = (e) => setProductPicture(e.target.files[0]);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async () => {
    if (!price || !description || !productPicture) {
      console.error('All required fields must be filled');
      return;
    }

    const formData = new FormData();
    formData.append('price', price);
    formData.append('availableAmount', quantity);
    formData.append('picture', productPicture);
    formData.append('description', description);

    try {
      const response = await fetch(`http://localhost:4000/admin/products/${id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to edit product');
      }

      const result = await response.json();
      console.log('Product edited successfully:', result);
    } catch (error) {
      console.error('Error editing product:', error.message);
    }
  }

  return (
    <>
      <div className='container'>
        <h1>Edit product</h1>
        <p>Product name: <input className='inputfield' type='text' value={productName} onChange={handleProductNameChange}></input></p>
        <p>Price : <input className='inputfield' type='number' value={price} onChange={handlePriceChange}></input></p>
        <p>Available quantity: <input className='inputfield' type='number' value={quantity} onChange={handleQuantityChange}></input></p>
        <p>Description: <input className='inputfield' type='text' value={description} onChange={handleDescriptionChange}></input></p>
        <p>Product picture: <input className='inputpic' type='file' onChange={handleProductPictureChange}></input></p>
        <button className='button' onClick={handleSubmit}>ADD</button>
      </div>
    </>
  );
}

export default editProd;