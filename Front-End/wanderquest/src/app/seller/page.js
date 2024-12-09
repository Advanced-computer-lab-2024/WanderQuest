'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import Navbar from '../../../components/Navbar';
import Products from '../../../components/Products';
import AcceptTerms from '../../../components/AcceptTerms';
import { FaUserCircle } from "react-icons/fa";
import styles from "../../../Styles/Seller.module.css";
import LandingPage from '../../../components/LandingPage';


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
            <AcceptTerms/>
            <Navbar/>
            <LandingPage/>
            <p>Welcome to the Seller page!</p>
            <h1>Seller Page</h1>
            <button onClick={handleRedirectp}>Go to products</button>
            <button onClick={handleRedirectcrep}>Create Product</button>
            <button className={styles.profileButton} onClick={handleRedirectProfile}>
            </button>
            
        </div>
    );
}; 