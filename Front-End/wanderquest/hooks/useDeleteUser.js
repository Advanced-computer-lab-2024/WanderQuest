import { useState } from 'react';

export default function useDeleteUser(users, setUsers) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const showDeleteConfirmation = (user) => {
    setSelectedUser(user);
    setPopupVisible(true);
  };

  const hideDeleteConfirmation = () => {
    setPopupVisible(false);
    setSelectedUser(null);
  };

  const deleteUserFromBackend = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/delete/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
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

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUserFromBackend(selectedUser._id);
    }
  };

  return {
    isPopupVisible,
    showDeleteConfirmation,
    hideDeleteConfirmation,
    confirmDelete,
  };
}
