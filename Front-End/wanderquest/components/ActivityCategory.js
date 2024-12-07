import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '/Styles/ActivityCategory.module.css';

const ActivityCategory = () => {
  const [actInput, setActInput] = useState('');
  const [acts, setActs] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState({ id: null, value: '' });
  const [showActs, setShowActs] = useState(false); // State to control visibility of the tags list



  useEffect(() => {
    const fetchActs = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/categories',{
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }); // Adjust URL as needed
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setActs(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchActs();
  }, []);
  

  // Handle input change for adding a new category
  const handleInputChange = (e) => {
    setActInput(e.target.value);
  };

  // Handle form submission to add a new category
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!actInput.trim()) {
      setMessage({ type: 'error', text: 'Activity Category cannot be empty.' });
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/admin/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: actInput }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to add category');
      const newCategory = await response.json();
      setActs([...acts, newCategory]);
      setMessage({ type: 'success', text: 'Activity Category added successfully!' });
      setActInput('');
      setIsInputVisible(false);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Error adding Activity Category.' });
      console.error('Error adding Activity Category:', error);
    }
  };
  
  // Handle deleting a category
  const handleDelete = async (actId) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/deleteCategory/${actId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete category');
      setActs(acts.filter((act) => act._id !== actId));
      setMessage({ type: 'success', text: 'Activity Category deleted successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting Activity Category.' });
      console.error('Error deleting Activity Category:', error);
    }
  };
  
  // Handle initiating edit mode for a category
  const handleEdit = (act) => {
    setIsEditing({ id: act._id, value: act.category });
  };

  // Handle input change while editing a category
  const handleEditChange = (e) => {
    setIsEditing({ ...isEditing, value: e.target.value });
  };

  // Handle submitting the edited category
  const handleEditSubmit = async (actId) => {
    if (!isEditing.value.trim()) {
      setMessage({ type: 'error', text: 'Activity Category cannot be empty.' });
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:4000/admin/editCategory/${actId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ category: isEditing.value }),
      });
      if (!response.ok) throw new Error('Failed to update category');
  
      // You don't need to rely on the response for the updated category value since
      // you already have the new value in `isEditing.value`.
      const updatedActs = acts.map((act) =>
        act._id === actId ? { ...act, category: isEditing.value } : act
      );
  
      setActs(updatedActs);
      setMessage({ type: 'success', text: 'Activity Category updated successfully!' });
      setIsEditing({ id: null, value: '' }); // Clear editing state
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Error updating Activity Category.' });
      console.error('Error updating Activity Category:', error);
    }
  };
  
  
  
  

  // Handle cancelling the edit mode
  const handleCancelEdit = () => {
    setIsEditing({ id: null, value: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Activity Category Manager</h1>
        <button className={styles.addTag} onClick={() => setIsInputVisible(!isInputVisible)}>
          {isInputVisible ? 'Cancel' : 'Add Category'}
        </button>
        <button className={styles.showTags} onClick={() => setShowActs(!showActs)}>
          {showActs ? 'Hide Categories' : 'Show Categories'}
        </button>
      </div>

      {/* Add category Form */}
      {isInputVisible && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={actInput}
            onChange={handleInputChange}
            placeholder="Enter a new category"
          />
          <button className={styles.editButton} type="submit">Submit</button>
        </form>
      )}

      {/* Feedback Messages */}
      {message.text && (
        <div className={message.type === 'error' ? styles.error : styles.success}>
          {message.text}
        </div>
      )}

      {/* Acts List Panel */}
      {showActs && (
        <div className={styles.tagsList}>
          <h2>Existing Categories</h2>
          {acts.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            <div className={styles.tagScroll}>
              <ul className={styles.tagGrid}>
                {acts.map((act) => (
                  <li
                    key={act._id}
                    className={`${styles.tagItem} ${isEditing.id === act._id ? styles.editing : ''}`}
                  >
                    {isEditing.id === act._id ? (
                      <>
                        <input
                          type="text"
                          value={isEditing.value}
                          onChange={handleEditChange}
                          className={styles.editInput}
                        />
                        <div className={styles.tagButtons}>
                          <button
                            type="button"
                            onClick={() => handleEditSubmit(act._id)}
                            className={`${styles.button} ${styles.editButton}`}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className={`${styles.button} ${styles.cancelButton}`}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span>{act.category}</span>
                        <div className={styles.tagButtons}>
                          <button
                            type="button"
                            onClick={() => handleEdit(act)}
                            className={`${styles.button} ${styles.editButton}`}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(act._id)}
                            className={`${styles.button} ${styles.deleteButton}`}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityCategory;
