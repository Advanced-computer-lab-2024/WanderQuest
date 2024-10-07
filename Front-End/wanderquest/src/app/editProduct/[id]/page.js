'use client';

import { useParams } from 'next/navigation'; // useParams for dynamic parameters
import { useRouter } from 'next/navigation'; // useRouter for navigation (optional)
import { useState } from 'react';

const EditProduct = () => {
    const { id } = useParams(); // Get the dynamic ID from the route
    const router = useRouter(); // Use for navigation if needed
    const [data, setData] = useState({});

    const fetchProductData = async () => {
        // Fetch the product data using the ID
        const response = await fetch(`http://localhost:4000/admin/products/${id}`);
        const data = await response.json();
        setData(data);
    }

    return (
        <div>
            <h1>Edit Product</h1>
            <p>Product ID: {id}</p>
            <button onClick={fetchProductData}>Fetch Product Data</button>
            {data && <div>
                <h2>Product Details</h2>
                <p>Name: {data.name}</p>
                <p>Price: {data.price}</p>
                <p>Description: {data.description}</p>
            </div>}
        </div>
    );
};

export default EditProduct;
