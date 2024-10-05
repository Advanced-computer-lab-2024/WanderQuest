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

        {/* Add Tourism Governor Section */}
        <div className={styles.tourismGovernor}>
          <h2>Add Tourism Governor</h2>
          <label>Name:</label>
          <input type="text" placeholder="Governor's Name" /><br />
          <label>Username:</label>
          <input type="text" placeholder="Unique Username" /><br />
          <label>Password:</label>
          <input type="text" placeholder="Auto-generated Password" disabled /><br />
          <button>Create Governor</button>
        </div>

        {/* Add New Admin Section */}
        <div className={styles.newAdmin}>
          <h2>Add New Admin</h2>
          <label>Name:</label>
          <input type="text" placeholder="Admin Name" /><br />
          <label>Username:</label>
          <input type="text" placeholder="Unique Username" /><br />
          <label>Password:</label>
          <input type="password" placeholder="Strong Password" /><br />
          <button>Add Admin</button>
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
