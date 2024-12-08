import styles from '../Styles/Creatprod.module.css'
import Products from './Products'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const EditProd = () => {
  const { id } = useParams();
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productPicture, setProductPicture] = useState(null);
  const [description, setDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(true);

  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const handleProductPictureChange = (e) => setProductPicture(e.target.files[0]);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const fetchProductData = async () => {
    try {
      // Fetch the product data using the ID
      const response = await fetch(`http://localhost:4000/admin/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      const data = await response.json();
      setPrice(data.price || '');
      setQuantity(data.availableAmount || '');
      setDescription(data.description || '');
      setProductName(data.name || '');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const handleSubmit = async () => {
    if (!price || !description) {
      console.error('All required fields must be filled');
      return;
    }

    const formData = new FormData();
    formData.append('price', price);
    formData.append('availableAmount', quantity);
    if (productPicture) {
      formData.append('picture', productPicture);
    }
    formData.append('description', description);

    console.log('Form data:', formData);

    try {
      const response = await fetch(`http://localhost:4000/admin/editProduct/${id}`, {
        method: 'PATCH',
        body: formData,
        credentials:"include"
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to edit product');
      }

      const result = await response.json();
      console.log('Product edited successfully:', result);
    } catch (error) {
      console.error('Error editing product:', error.message);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='container'>
        <h1>Edit {productName}</h1>
        <p>Price : <input className='inputfield' type='number' value={price} onChange={handlePriceChange}></input></p>
        <p>Available quantity: <input className='inputfield' type='number' value={quantity} onChange={handleQuantityChange}></input></p>
        <p>Description: <input className='inputfield' type='text' value={description} onChange={handleDescriptionChange}></input></p>
        <p>Product picture: <input className='inputpic' type='file' onChange={handleProductPictureChange}></input></p>
        <button className='button' onClick={handleSubmit}>Update</button>
      </div>
    </>
  );
}

export default EditProd;