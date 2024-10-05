'use client'
import React, { useState } from 'react';
import styles from '/Styles/ActivityCategory.module.css';
const ActivityCategory = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false); // To track whether a tag is being edited
  const [editIndex, setEditIndex] = useState(null);  // To track the index of the tag being edited

  const addOrUpdateTag = (e) => {
    e.preventDefault();
    
    // Input validation: Prevent empty or duplicate tags
    if (inputValue.trim()) {
      if (isEditing) {
        // Update the existing tag
        const updatedTags = [...tags];
        updatedTags[editIndex] = inputValue.trim();
        setTags(updatedTags);
        setIsEditing(false); // Reset editing mode
        setEditIndex(null);
      } else if (!tags.includes(inputValue.trim())) {
        // Add new tag if it's not a duplicate
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');  // Clear input field
    }
  };

  const editTag = (index) => {
    setInputValue(tags[index]); // Set the input field with the tag's current value
    setIsEditing(true);         // Enter edit mode
    setEditIndex(index);        // Track which tag is being edited
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove)); // Remove the selected tag
  };

  return (
    <div className={styles["cat-card"]}>
      <form onSubmit={addOrUpdateTag} className={styles["cat-card-form"]}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles["cat-card-input"]}
          placeholder="Add or edit a category"
        />
        <button type="submit" className={styles["cat-card-button"]}>
          {isEditing ? 'Update Tag' : 'Add Tag'}
        </button>
        <button>view all</button>
      </form>
      
      <div className={styles["cat-display"]}>
        {tags.map((tag, index) => (
          <div key={index} className={styles["cat"]}>
            <p>{tag}</p>
            <div className={styles["cat-buttons"]}>
              <button onClick={() => editTag(index)} className={styles["edit-cat"]}>✎</button>
              <button onClick={() => removeTag(tag)} className={styles["remove-cat"]}>×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCategory;
