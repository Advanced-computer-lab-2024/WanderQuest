// hooks/useDeleteUser.js
import { useState } from 'react';

export default function useDeleteUser(users, setUsers) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const showDeleteConfirmation = (username) => {
    setSelectedUser(username);
    setPopupVisible(true);
  };

  const hideDeleteConfirmation = () => {
    setPopupVisible(false);
    setSelectedUser(null);
  };

  const deleteUserFromBackend = async (username) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/delete/:id`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the users array to remove the deleted user
        setUsers(prevUsers => prevUsers.filter(user => user.username !== username));
        hideDeleteConfirmation();
        alert(`User ${username} deleted successfully.`);
      } else {
        alert('Failed to delete user. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUserFromBackend(selectedUser);
    }
  };

  return {
    isPopupVisible,
    showDeleteConfirmation,
    hideDeleteConfirmation,
    confirmDelete
  };
}
