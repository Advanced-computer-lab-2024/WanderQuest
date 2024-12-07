'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '/Styles/TagManager.module.css';

const TagManager = () => {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState({ id: null, value: '' });
  const [showTags, setShowTags] = useState(false); // State to control visibility of the tags list


  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:4000/tourismGovernor/tags',{
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }); // Adjust URL as needed
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  // Handle input change for adding a new tag
  const handleInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // Handle form submission to add a new tag
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!tagInput.trim()) {
      setMessage({ type: 'error', text: 'Tag cannot be empty.' });
      return;
    }
  
    try {
      // POST request to add a new tag
      const response = await axios.post('http://localhost:4000/tourismGovernor/addTag', {
         type: tagInput,
        credentials: 'include',
        });
      setTags([...tags, response.data]); // Assuming the response contains the new tag object
      setMessage({ type: 'success', text: 'Tag added successfully!' });
      setTagInput(''); // Clear input
      setIsInputVisible(false); // Hide input field after submission
    } catch (error) {
      // Improved error handling
      if (error.response && error.response.data && error.response.data.error) {
        setMessage({ type: 'error', text: error.response.data.error });
      } else {
        setMessage({ type: 'error', text: 'An error occurred while adding the tag.' });
      }
    }
  
  };
  
  
  // Handle deleting a tag
  const handleDelete = async (tagId) => {
    try {
      // DELETE request to remove the tag
      await axios.delete(``); // Send the tag ID to delete
      setTags(tags.filter(tag => tag._id !== tagId)); // Filter out the deleted tag
      setMessage({ type: 'success', text: 'Tag deleted successfully.' });

      //fetchTags();
    } catch (error) {
      console.error('Error deleting tag:', error);
      setMessage({ type: 'error', text: 'Error deleting tag.' });
    }
  };
  
  

  // Handle initiating edit mode for a tag
  const handleEdit = (tag) => {
    setIsEditing({ id: tag._id, value: tag.type });
  };

  // Handle input change while editing a tag
  const handleEditChange = (e) => {
    setIsEditing({ ...isEditing, value: e.target.value });
  };

  // Handle submitting the edited tag
  const handleEditSubmit = async (tagId) => {
    if (!isEditing.value.trim()) {
      setMessage({ type: 'error', text: 'Tag cannot be empty.' });
      return;
    }
  
    try {
      // PATCH request to update the tag
      const response = await axios.patch(``, { 
        type: isEditing.value,
        credentials: 'include',
      }); // Update the tag string
      const updatedTags = tags.map((t) => (t._id === tagId ? response.data : t)); // Update the tag in the state
      setTags(updatedTags);
      setMessage({ type: 'success', text: 'Tag updated successfully!' });
      setIsEditing({ id: null, value: '' }); // Exit editing mode

    } catch (error) {
      console.error('Error updating tag:', error);
      setMessage({ type: 'error', text: 'Error updating tag.' });
    }
  };
  

  // Handle cancelling the edit mode
  const handleCancelEdit = () => {
    setIsEditing({ id: null, value: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Tag Manager</h1>
        <button className={styles.addTag} onClick={() => setIsInputVisible(!isInputVisible)}>
          {isInputVisible ? 'Cancel' : 'Add Tag'}
        </button>
        <button className={styles.showTags} onClick={() => setShowTags(!showTags)}>
          {showTags ? 'Hide Tags' : 'Show Tags'}
        </button>
      </div>

      {/* Add Tag Form */}
      {isInputVisible && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={tagInput}
            onChange={handleInputChange}
            placeholder="Enter a new tag"
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

      {/* Tags List Panel */}
      {showTags && (
        <div className={styles.tagsList}>
          <h2>Existing Tags</h2>
          {tags.length === 0 ? (
            <p>No tags found.</p>
          ) : (
            <div className={styles.tagScroll}>
              <ul className={styles.tagGrid}>
                {tags.map((tag) => (
                  <li
                    key={tag._id}
                    className={`${styles.tagItem} ${isEditing.id === tag ? styles.editing : ''}`}
                  >
                    {isEditing.id === tag._id ? (
                      <>
                        <input
                          type="text"
                          value={isEditing.value}
                          onChange={handleEditChange}
                          className={styles.editInput}
                        />
                        <div className={styles.tagButtons}>
                          <button
                            onClick={() => handleEditSubmit(tag._id)}
                            className={`${styles.button} ${styles.editButton}`}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className={`${styles.button} ${styles.cancelButton}`}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span>{tag.type}</span>
                        <div className={styles.tagButtons}>
                          <button
                            onClick={() => handleEdit(tag)}
                            className={`${styles.button} ${styles.editButton}`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(tag._id)}
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

export default TagManager;



