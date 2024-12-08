'use client';
import { useState, useEffect } from 'react';
import styles from "../Styles/AddAdmin.module.css"

const AddAdmin = () => {
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

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

      return(
        <div className={styles.AdminWrapper}>
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
      )
}
export default AddAdmin;
