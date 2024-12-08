'use client';
import { useState, useEffect } from 'react';
import styles from "../Styles/AddGovernor.module.css"


const AddTourismGovernor = () => {
  const [govUsername, setGovUsername] = useState('');
  const [govPassword, setGovPassword] = useState('');
  
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

return(   
  <div className={styles.tourismGovernorWrapper}>
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
  </div>
  
)
};
export default AddTourismGovernor;