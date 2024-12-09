import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Styles/PreferenceTags.module.css';

const ActivityCategory = () => {
  const [actInput, setActInput] = useState('');
  const [acts, setActs] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState({ id: null, value: '' });
  const [showActs, setShowActs] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Manage popup visibility
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Track the category to delete

  useEffect(() => {
    const fetchActs = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/categories', {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setActs(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchActs();
  }, []);

  const handleInputChange = (e) => {
    setActInput(e.target.value);
  };

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
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Error adding Activity Category.' });
      console.error('Error adding Activity Category:', error);
    }
  };

  const handleDelete = async (actId) => {
    setCategoryToDelete(actId); // Set the category to delete
    setShowConfirmPopup(true); // Show confirmation popup
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      const response = await fetch(`http://localhost:4000/admin/deleteCategory/${categoryToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete category');
      setActs(acts.filter((act) => act._id !== categoryToDelete));
      setMessage({ type: 'success', text: 'Activity Category deleted successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting Activity Category.' });
      console.error('Error deleting Activity Category:', error);
    } finally {
      setShowConfirmPopup(false); // Close the confirmation popup
      setCategoryToDelete(null); // Reset category to delete
    }
  };

  const cancelDelete = () => {
    setShowConfirmPopup(false); // Close the confirmation popup without deleting
    setCategoryToDelete(null); // Reset category to delete
  };

  const handleEdit = (act) => {
    setIsEditing({ id: act._id, value: act.category });
  };

  const handleEditChange = (e) => {
    setIsEditing({ ...isEditing, value: e.target.value });
  };

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
        body: JSON.stringify({ category: isEditing.value }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to update category');

      const updatedActs = acts.map((act) =>
        act._id === actId ? { ...act, category: isEditing.value } : act
      );

      setActs(updatedActs);
      setMessage({ type: 'success', text: 'Activity Category updated successfully!' });
      setIsEditing({ id: null, value: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Error updating Activity Category.' });
      console.error('Error updating Activity Category:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing({ id: null, value: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Activity Category Manager</h1>
      </div>

      {/* Add category Form with button next to the input */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={actInput}
            onChange={handleInputChange}
            placeholder="Enter a new category"
          />
          <button className={styles.addCategoryButton} type="submit">Add Category</button>
        </div>
      </form>

      {/* Feedback Messages */}
      {message.text && (
        <div className={message.type === 'error' ? styles.error : styles.success}>
          {message.text}
        </div>
      )}

      {/* Show Categories button */}
      <button className={styles.showTagsButton} onClick={() => setShowActs(!showActs)}>
        {showActs ? 'Hide Categories' : 'Show Categories'}
      </button>

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

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className={styles.confirmPopup}>
          <div className={styles.popupContent}>
            <h3>Are you sure you want to delete this category?</h3>
            <div className={styles.popupButtons}>
              <button
                className={`${styles.button} ${styles.confirmButton}`}
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityCategory;
