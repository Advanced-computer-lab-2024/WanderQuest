// hooks/useUserList.js
import { useState, useEffect } from 'react';

// Custom hook for fetching and managing user data
const useUserList = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch all users from the API (replace with actual API call)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Simulating an API call
      const response = await fetch('http://localhost:4001/users'); // Replace with your API endpoint
      const data = await response.json();
      setUsers(data); // Set fetched users to state
    } catch (err) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  return { users, setUsers, loading, error }; // Return setUsers
};

export default useUserList;
