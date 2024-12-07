'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Styles/Navbar.css'; // Ensure this path is correct

const Navbar = () => {
    const isSignedIn = false;
    
    return (
        <div className="navbar-container">
            <div className='navbar-leftside'> 
                
            <Link href="/"><img className="navbar-logo" src="/logo.png" alt="Logo" /></Link>
            </div>
            
            <div className='navbar-middleside'>
                
                <Link href="/activities" className="navbar-link">Products</Link>
                <button className="navbar-button">Activities</button>
                <button className="navbar-button">Itinerary</button>
                <button className="navbar-button">Historical Places</button>
            </div>
            <div className='navbar-rightside'>
            <Link href="/signin">
               <button className='navbar-signup'>Sign In</button>
            </Link>
            
            </div>
        </div>
    );
}

export default Navbar;
