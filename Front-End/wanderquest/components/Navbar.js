'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Styles/Navbar.css'; // Ensure this path is correct

const Navbar = () => {
    const isloggedin = false;

    return (
        <div className="navbar-container">
            <div className='navbar-leftside'> 
                <img className="navbar-logo" src="/logo.png" alt="Logo" />
            </div>
            <div className='navbar-middleside'>
                <button>Products</button>
                <button>Activities</button>
                <button>Itinerary</button>
                <button>Historical Places</button>
            </div>
            <div className='navbar-rightside'>
                <button className='navbar-signup'>Signup</button>
            </div>
        </div>
    );
}

export default Navbar;