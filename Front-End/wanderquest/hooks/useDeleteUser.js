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

  const deleteUser = (username) => {
    // Simulate backend call
    setTimeout(() => {
      // Update the users array to remove the deleted user
      setUsers(prevUsers => prevUsers.filter(user => user.username !== username));
      hideDeleteConfirmation();
    }, 1000); // Simulate a delay, adjust as necessary
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser);
    }
  };

  return {
    isPopupVisible,
    showDeleteConfirmation,
    hideDeleteConfirmation,
    confirmDelete
  };
}
