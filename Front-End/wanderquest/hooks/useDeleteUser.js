import { useState } from 'react';

export default function useDeleteUser(users, setUsers) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store the full user object

  // Show confirmation popup for delete
  const showDeleteConfirmation = (user) => {
    setSelectedUser(user);  // Store the user object, including _id
    setPopupVisible(true);
  };

  // Hide confirmation popup
  const hideDeleteConfirmation = () => {
    setPopupVisible(false);
    setSelectedUser(null);
  };

  // Delete user from backend by ID
  const deleteUserFromBackend = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/delete/${userId}`, {  // Replace :id with actual userId
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted user from the state
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        hideDeleteConfirmation();
        alert('User deleted successfully.');
      } else {
        alert('Failed to delete user. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  };

  // Confirm delete action
  const confirmDelete = () => {
    if (selectedUser) {
      deleteUserFromBackend(selectedUser._id);  // Pass _id for deletion
    }
  };

  return {
    isPopupVisible,
    showDeleteConfirmation,
    hideDeleteConfirmation,
    confirmDelete
  };
}
