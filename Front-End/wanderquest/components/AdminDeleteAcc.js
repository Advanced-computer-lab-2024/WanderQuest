import React, { useState, useEffect } from 'react';
import styles from '../Styles/AdminDeleteAcc.module.css';
import useDeleteUser from '../hooks/useDeleteUser'; // Import delete custom hook
import useUserList from '../hooks/useUserList'; // Import list custom hook

const AdminDeleteAccount = () => {
    const [search, setSearch] = useState('');
    const { users, setUsers, loading, error } = useUserList(); // Get setUsers from the hook
   
    const {
        isPopupVisible,
        showDeleteConfirmation,
        hideDeleteConfirmation,
        confirmDelete
    } = useDeleteUser(users, setUsers); // Pass setUsers here

    if (loading) return <p>Loading users...</p>; // Show loading state
    if (error) return <p>{error}</p>; // Show error state if any


if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className={styles.tableWrapper}>
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
      </div>

  );
};

export default AdminDeleteAccount;