'use client';
import React, { useState , useEffect} from 'react';
import Link from 'next/link';
import styles from '../Styles/Navbar.css';
import { faUser , faBell ,faBars} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotificationButton from './NotificationsTourGuide';
import axios from 'axios';


const AdminNavbar = () => {
    const [username, setUsername] = useState('');
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!isProfileMenuOpen);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen); // Show or hide sidebar
    };

    const handleLogout = async () => {
      try {
          await axios.post('http://localhost:4000/authentication/logout', {}, {
              withCredentials: true,
          });
          // Redirect to home page after logout
          window.location.href = '/';
      } catch (error) {
          console.error('Error logging out:', error);
      }
  };

    
    useEffect(() => {
        // Fetch the logged-in user's info
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:4000/authentication/user', {
                    method: 'GET',
                    credentials: 'include', // Sends cookies or tokens with the request
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username); // Assuming the backend returns { username: '...' }
                } else {
                    console.error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);


    return (
        <>
            <div className="navbar-container">
                {/* Sidebar Menu Icon */}
                <div className="navbar-menu-icon" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars} className="menu-icon" />
                    </div>

                    
                <div className='navbar-leftside'> 
                    <Link href="/admin">
                        <img className="navbar-logo" src="/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div className='navbar-middleside'>
                    <button className="navbar-button" onClick={() => (window.location.href = '/admin/products')}>Products</button>
                    <button className="navbar-button" onClick={() => (window.location.href = '/admin/event')}>Activities</button>
                    <button className="navbar-button" onClick={() => (window.location.href = '/admin/iti')}>Itinerary</button>
                    <button className="navbar-button" onClick={() => (window.location.href = '/admin')}>Reports</button>
                </div>
                <div className='navbar-rightside'>
                    <NotificationButton role="admin"/>

                    <FontAwesomeIcon icon={faUser} className="profile-icon" onClick={toggleProfileMenu}/>
                    {username && <span className="navbar-username"> {username}</span>}
                    
                {/* Profile Menu */}
                {isProfileMenuOpen && (
                    <div className="profile-menu">
                        <Link href="/admin/changePassword" className="profile-menu-item">
                            Change Password
                        </Link>
                        <div onClick={handleLogout} className="profile-menu-item">
                            Log out
                        </div>
                    </div>
                )}
            
            </div>
            {isSidebarOpen && (
        <div className="sidebar">
          <ul>
            <li>
              <Link href="/admin/Requests">Users Management</Link>
            </li>
            <li>
              <Link href="/admin/deleteAccount">Delete Account</Link>
            </li>
            <li>
              <Link href="/admin/addGovernor">Add Tourism Governor</Link>
            </li>
            <li>
              <Link href="/admin/addAdmin">Add Admin</Link>
            </li>
            <li>
              <Link href="/admin/editprod">Add Product</Link>
            </li>
            <li>
              <Link href="/admin/complaints">Complaints</Link>
            </li>
            <li>
              <Link href="/admin/promoCodes">Create Promocode</Link>
            </li>
            <li>
              <Link href="/admin/prefTags">Preference Tags</Link>
            </li>
            
          </ul>
        </div>

      )}
      </div>
    </>
  );
};

export default AdminNavbar;
