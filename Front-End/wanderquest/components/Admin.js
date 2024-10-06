// pages/admin.js
'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/Admin.module.css'; // Adjust path if needed

export default function AdminPage() {
  // State for the search input (for deleting users)
  const [search, setSearch] = useState('');
  const [totalUsers, setTotalUsers] = useState(null); // Replace with backend value
  const [activeUsers, setActiveUsers] = useState(null); // Replace with backend value
  const [inactiveUsers, setInactiveUsers] = useState(null); // Replace with backend value
  const [users, setUsers] = useState([]); // To hold the user data for deletion

  const [govUsername, setGovUsername] = useState('');
  const [govPassword, setGovPassword] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Placeholder function to fetch user data from backend
  const fetchUserData = async () => {
    // Simulate a fetch call to your backend
    const data = await fetch('/api/users'); // Adjust the API endpoint as necessary
    const json = await data.json();
    setTotalUsers(json.totalUsers);
    setActiveUsers(json.activeUsers);
    setInactiveUsers(json.inactiveUsers);
    setUsers(json.users); // Assuming your API returns an array of users
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Fetch user data when the component mounts

  const checkUsernameExists = async (username) => {
    const response = await fetch('http://localhost:4001/admins'); // Adjust endpoint for other user types
    const data = await response.json();
    return data.some(user => user.username === username);
  };

  const generatePassword = (length = 10) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
  };


  const handleCreateGovernor = async (e) => {
    e.preventDefault();
    const usernameExists = await checkUsernameExists(govUsername);
        if (usernameExists) {
            alert('Username already exists. Please choose a different one.');
            return;
        }
    
    const generatedPassword = generatePassword();
    setGovPassword(generatedPassword); // Update state with generated password


    const newGovernorData = {
      username: govUsername,
      password: generatedPassword,
    };

    try {
      const response = await fetch('http://localhost:4001/tourismGovernors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGovernorData),
      });

      if (response.ok) {
        alert('Governor created successfully!');
        fetchUserData(); // Refresh the user data
      } else {
        alert('Failed to create governor.');
      }
    } catch (error) {
      console.error('Error creating governor:', error);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault(); 

    const usernameExists = await checkUsernameExists(adminUsername);
        if (usernameExists) {
            alert('Username already exists. Please choose a different one.');
            return;
        }

    const newAdminData = {
      username: adminUsername,
      password: adminPassword,
    };

    try {
      const response = await fetch('http://localhost:4001/admins', { // Adjust endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAdminData),
      });

      if (response.ok) {
        alert('Admin added successfully!');
        fetchUserData(); // Refresh the user data
      } else {
        alert('Failed to add admin.');
      }
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <h1>Admin Dashboard</h1>
      <nav>
        <button>Add New</button>
        <button>Manage Users</button>
        <button>Logs</button>
        <button>Settings</button>
      </nav>

      {/* Main Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>

        {/* User Accounts Section */}
        <div className={styles.userAccounts}>
          <h2>User Accounts</h2>
          <p>Total Users: {totalUsers !== null ? totalUsers : 'Loading...'}</p>
          <p>Active: {activeUsers !== null ? activeUsers : 'Loading...'}</p>
          <p>Inactive: {inactiveUsers !== null ? inactiveUsers : 'Loading...'}</p>
          <div>
            <button>View</button>
            <button>Edit</button>
            <button className={styles.deleteButton}>Delete</button>
          </div>
        </div>

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
        <table border="1" style={{ width: '100%', marginTop: '10px' }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(user => user.username.includes(search)).map((user) => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => handleDelete(user.username)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
