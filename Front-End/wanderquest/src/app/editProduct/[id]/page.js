'use client';

import { useParams } from 'next/navigation'; // useParams for dynamic parameters
import { useRouter } from 'next/navigation'; // useRouter for navigation (optional)

const EditProduct = () => {
    const { id } = useParams(); // Get the dynamic ID from the route
    const router = useRouter(); // Use for navigation if needed

    return (
        <div>
            <h1>Edit Product</h1>
            <p>Product ID: {id}</p>
            {/* Add your form or components for editing the product here */}
        </div>
    );
};

export default EditProduct;
