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
        const response = await fetch('http://localhost:4000/admin/users', {
            credentials: "include", // Ensure cookies are sent
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`, // Example of using a token
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.users); // Match backend structure: { users: [...] }
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
