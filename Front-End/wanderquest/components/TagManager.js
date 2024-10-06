import React, { useState } from 'react';
import styles from '/Styles/TagManager.module.css';

const TagManager = () => {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(["Testing", "it", "out"]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState({ id: null, value: '' });
  const [showTags, setShowTags] = useState(false); // State to control visibility of the tags list

  // Handle input change for adding a new tag
  const handleInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // Handle form submission to add a new tag
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tagInput.trim()) {
      setMessage({ type: 'error', text: 'Tag cannot be empty.' });
      return;
    }

    // Add the new tag to the existing array of tags
    setTags([...tags, tagInput]);
    setMessage({ type: 'success', text: 'Tag added successfully!' });
    setTagInput('');
    setIsInputVisible(false);
  };

  // Handle deleting a tag
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
    setMessage({ type: 'success', text: 'Tag deleted successfully.' });
  };

  // Handle initiating edit mode for a tag
  const handleEdit = (tag) => {
    setIsEditing({ id: tag, value: tag });
  };

  // Handle input change while editing a tag
  const handleEditChange = (e) => {
    setIsEditing({ ...isEditing, value: e.target.value });
  };

  // Handle submitting the edited tag
  const handleEditSubmit = (tag) => {
    if (!isEditing.value.trim()) {
      setMessage({ type: 'error', text: 'Tag cannot be empty.' });
      return;
    }

    const updatedTags = tags.map((t) => (t === tag ? isEditing.value : t));
    setTags(updatedTags);
    setMessage({ type: 'success', text: 'Tag updated successfully.' });
    setIsEditing({ id: null, value: '' });
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
                    key={tag}
                    className={`${styles.tagItem} ${isEditing.id === tag ? styles.editing : ''}`}
                  >
                    {isEditing.id === tag ? (
                      <>
                        <input
                          type="text"
                          value={isEditing.value}
                          onChange={handleEditChange}
                          className={styles.editInput}
                        />
                        <div className={styles.tagButtons}>
                          <button
                            onClick={() => handleEditSubmit(tag)}
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
                        <span>{tag}</span>
                        <div className={styles.tagButtons}>
                          <button
                            onClick={() => handleEdit(tag)}
                            className={`${styles.button} ${styles.editButton}`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(tag)}
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
