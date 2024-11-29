// pages/admin.js
'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/Admin.module.css';
import useDeleteUser from '../hooks/useDeleteUser'; // Import delete custom hook
import useUserList from '../hooks/useUserList'; // Import list custom hook
import Link from 'next/link';
import PrefTag from './PrefTag';
import ActivityCategory from './ActivityCategory';
import Pending from '../src/app/admin/Requests/page';

export default function AdminPage() {
  const [search, setSearch] = useState('');
  const { users, setUsers, loading, error } = useUserList(); // Get setUsers from the hook
  const [govUsername, setGovUsername] = useState('');
  const [govPassword, setGovPassword] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const {
    isPopupVisible,
    showDeleteConfirmation,
    hideDeleteConfirmation,
    confirmDelete
  } = useDeleteUser(users, setUsers); // Pass setUsers here

  if (loading) return <p>Loading users...</p>; // Show loading state
  if (error) return <p>{error}</p>; // Show error state if any


  const generatePassword = (length = 10) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&()";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
  };

  const handleCreateGovernor = async (e) => {
    e.preventDefault();
  
    const generatedPassword = generatePassword();
    setGovPassword(generatedPassword); // Update state with generated password
  
    const newGovernorData = {
      username: govUsername,
      password: generatedPassword,
    };
  
    try {
      const response = await fetch('http://localhost:4000/admin/governor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGovernorData),
        credentials:"include"
      });
  
      if (response.ok) {
        alert('Governor created successfully!');
        window.location.reload(); // Refresh the page
      } else {
        alert('Failed to create governor.');
      }
    } catch (error) {
      console.log('Error creating governor:', error);
    }
  };
  
  const handleAddAdmin = async (e) => {
    e.preventDefault();
  
    const newAdminData = {
      username: adminUsername,
      password: adminPassword,
    };
  
    try {
      const response = await fetch('http://localhost:4000/admin/', { // Adjust endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAdminData),
        credentials:"include"
      });
  
      if (response.ok) {
        alert('Admin added successfully!');
        window.location.reload(); // Refresh the page
      } else {
        alert('Failed to add admin.');
      }
    } catch (error) {
      console.log('Error adding admin:', error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <h1>Admin Dashboard</h1>
      <div className={styles.basic}>
      <Link href="/admin/Requests">
      <button>Manage Pending Requests</button>
      </Link>
      </div>
      {/* Main Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>

        {/* Add Tourism Governor Section */}
        <div className={styles.tourismGovernor}>
          <h2>Add Tourism Governor</h2>
          <form onSubmit={handleCreateGovernor}>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Unique Username"
              value={govUsername}
              onChange={(e) => setGovUsername(e.target.value)}
              required
            /><br />
            <label>Password:</label>
            <input
              type="text" // Display generated password as plain text
              value={govPassword} // You can also choose to hide this if you want
              placeholder='Auto-Generated Password'
              disabled
            /><br />
            <button type="submit">Create Governor</button>
          </form>
        </div>

        {/* Add New Admin Section */}
        <div className={styles.newAdmin}>
          <h2>Add New Admin</h2>
          <form onSubmit={handleAddAdmin}>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Unique Username"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              required
            /><br />
            <label>Password:</label>
            <input
              type="password"
              placeholder="Strong Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
            /><br />
            <button type="submit">Add Admin</button>
          </form>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className={styles.deleteAccount}>
        <h2>Delete Account from System</h2>
        <input
          type="text"
          placeholder="Search for User"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(users) && users.filter(user => user.username.includes(search)).map((user) => (
    <tr key={user._id}>
      <td>{user.username}</td>
      <td>{user.role}</td>
      <td>
        <button
          className={styles.deleteButton}
          onClick={() => showDeleteConfirmation(user)} // Pass the full user object
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
      <div className="flex-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <PrefTag/>
      <ActivityCategory/>
      </div>
      {/* Confirmation Popup */}
      {isPopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Are you sure you want to delete this user?</h3>
            <button className={styles.yesButton} onClick={confirmDelete}>Yes, Delete</button>
            <button className={styles.cancelButton} onClick={hideDeleteConfirmation}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
}