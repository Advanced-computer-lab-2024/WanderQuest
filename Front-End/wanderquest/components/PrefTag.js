import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '/Styles/PreferenceTags.module.css';

const PrefTag = () => {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState({ id: null, value: '' });
  const [showTags, setShowTags] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null); // State to handle confirmation for delete action

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/tags', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch Preference Tags');
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
      const response = await fetch('http://localhost:4000/admin/addTag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ type: tagInput }),
      });
      if (!response.ok) throw new Error('Cannot Create Tag!');
      const newTag = await response.json();
      setTags([...tags, newTag]);
      setMessage({ type: 'success', text: 'Tag added successfully!' });
      setTagInput('');
      setIsInputVisible(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error adding tag:', error);
      setMessage({ type: 'error', text: 'Error adding tag.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  // Handle deleting a tag
  const handleDelete = async (tagId) => {
    setConfirmDelete(tagId); // Trigger confirmation popup
  };

  const confirmDeletion = async (tagId) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/deleteTag/${tagId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Cannot Delete Tag!');
      setTags(tags.filter((tag) => tag._id !== tagId));
      setMessage({ type: 'success', text: 'Preference Tag deleted successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      setConfirmDelete(null); // Close the confirmation
    } catch (error) {
      console.error('Error deleting tag:', error);
      setMessage({ type: 'error', text: 'Error deleting tag.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      setConfirmDelete(null);
    }
  };

  // Handle initiating edit mode for a tag
  const handleEdit = (tag) => {
    setIsEditing({ id: tag._id, value: tag.type });
  };

  const handleEditChange = (e) => {
    setIsEditing({ ...isEditing, value: e.target.value });
  };

  const handleEditSubmit = async (tagId) => {
    if (!isEditing.value.trim()) {
      setMessage({ type: 'error', text: 'Tag cannot be empty.' });
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/admin/editTag/${tagId}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ type: isEditing.value }),
      });
      if (!response.ok) throw new Error('Cannot Update Tag!');
      const updatedTags = tags.map((tag) =>
        tag._id === tagId ? { ...tag, type: isEditing.value } : tag
      );
      setTags(updatedTags);
      setMessage({ type: 'success', text: 'Tag updated successfully!' });
      setIsEditing({ id: null, value: '' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error updating tag:', error);
      setMessage({ type: 'error', text: 'Error updating tag.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing({ id: null, value: '' });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.adminTitle}>Manage Preference Tags</h1>

      {/* Tag Input */}
      <div className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={tagInput}
            onChange={handleInputChange}
            placeholder="Enter a new tag"
          />
          <button className={styles.addTagButton} onClick={handleSubmit}>
            Add Tag
          </button>
        </div>
      </div>

      {/* Feedback Messages */}
      {message.text && (
        <div
          className={message.type === 'error' ? styles.error : styles.success}
        >
          {message.text}
        </div>
      )}

      {/* Show Tags Button */}
      <button className={styles.showTagsButton} onClick={() => setShowTags(!showTags)}>
        {showTags ? 'Hide Tags' : 'Show Tags'}
      </button>

      {/* Tags List */}
      {showTags && (
        <div className={styles.tagsList}>
          {tags.length === 0 ? (
            <p>No tags found.</p>
          ) : (
            <ul>
              {tags.map((tag) => (
                <li key={tag._id} className={styles.tagItem}>
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
                          className={styles.editButton}
                        >
                          Save
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span>{tag.type}</span>
                      <div className={styles.tagButtons}>
                        <button
                          onClick={() => handleEdit(tag)}
                          className={styles.editButton}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tag._id)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Confirmation Popup */}
      {confirmDelete && (
        <div className={styles.confirmPopup}>
          <p>Are you sure you want to delete this tag?</p>
          <button onClick={() => confirmDeletion(confirmDelete)} className={styles.confirmButton}>Yes</button>
          <button onClick={() => setConfirmDelete(null)} className={styles.cancelButton}>No</button>
        </div>
      )}
    </div>
  );
};

export default PrefTag;
