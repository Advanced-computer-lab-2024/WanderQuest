'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import Navbar from '../../../components/Navbar';
import Products from '../../../components/Products';
import AcceptTerms from '../../../components/AcceptTerms';

export default function seller(){
    const router = useRouter();
    const handleRedirectcrep = () => {
        router.push('/seller/creatprod');
    };
    const handleRedirectp = () => {
        router.push('/seller/products');
    };
    const handleRedirectProfile = () => {
        router.push('/seller/profile');
    };
    return (
        <div>
            <Navbar/>
            <AcceptTerms/>
            <h1>Seller Page</h1>
            <button onClick={handleRedirectp}>Go to products</button>
            <button onClick={handleRedirectcrep}>Create Product</button>
            <button onClick={handleRedirectProfile}>Profile</button>
            <p>Welcome to the Seller page!</p>
        </div>
    );
}; 