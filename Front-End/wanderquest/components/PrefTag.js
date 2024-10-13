import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '/Styles/PreferenceTags.module.css';

const PrefTag = () => {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState({ id: null, value: '' });
  const [showTags, setShowTags] = useState(false); // State to control visibility of the tags list


  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/tags'); 
        if(!response.ok) throw new Error('Failed to fetch Preference Tags');
        const fetched = await response.json();
        setTags(fetched);
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
      console.log(tagInput);
      const response = await fetch('http://localhost:4000/admin/addTag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({type: tagInput}),

      }); 
      if(!response.ok) throw new Error('Cannot Create Tag!');
      const newTag = await response.json();
      setTags([...tags, newTag]); // Assuming the response contains the new tag object
      setMessage({ type: 'success', text: 'Tag added successfully!' });
      setTagInput(''); // Clear input
      setIsInputVisible(false); // Hide input field after submission
    } catch (error) {
      console.error('Error adding tag:', error.response ? error.response.data : error.message);
      setMessage({ type: 'error', text: 'Error adding tag.' });
    }
  };
  
  
  // Handle deleting a tag
  const handleDelete = async (tagId) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/deleteTag/${tagId}`,{
        method: 'DELETE'
      });
      if(!response.ok) throw new Error('Cannot Delete Tag!');
      setTags(tags.filter((tag)=> tag._id !== tagId));
      setMessage({type: 'success', text: 'Preference Tag deleted successfully!'});
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
      const response = await fetch(`http://localhost:4000/admin/editTag/${tagId}`, { 
        method: 'PATCH',
        headers:{
          'Contetnt-type': 'application/json',
        },
        body: JSON.stringify({type: isEditing.value}),
       });
      if( !response.ok) throw new Error('Cannot Update Tag!');
      const updatedTags = tags.map((tag) => 
        (tag._id === tagId ? {...tag, type: isEditing.value } : tag)); // Update the tag in the state
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
        <h1>Preference Tag Manager</h1>
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

export default PrefTag;



