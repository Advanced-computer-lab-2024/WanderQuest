'use client';
import React, { useState, useEffect } from "react";
import styles from "/Styles/TagCard.module.css";

// ID generator function
const generateID = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const Tag = () => {
  const [tags, setTags] = useState([]); // Pre-existing tags
  const [isInputVisible, setIsInputVisible] = useState(false); // To toggle input field visibility
  const [type, setType] = useState(""); // Current tag being typed
  const [id, setId] = useState("");

  useEffect(() => {
    // Generate ID once after initial render
    setId(generateID());
  }, []); // Empty dependency array to run only once

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type.trim() !== "") {
        setTags((prevTags) => [...prevTags, type.trim()]);
        setType("");
      }
    }
  };

  const toggleInput = () => {
    setIsInputVisible((prevState) => !prevState);
  };

  return (
    <div className={styles["tag-card"]}>
      {/* If input is not visible, show the 'Add Tag' button */}
      {!isInputVisible && (
        <button
          className={styles["tag-card-button"]}
          onClick={toggleInput}
          aria-label="Add a new tag"
        >
          Add Tag
        </button>
      )}

      {/* If input is visible, show the input field and 'Close' button */}
      {isInputVisible && (
        <div className={styles["tag-card-form"]}>
          <input
            type="text"
            id={`type-${id}`} // Use generated ID here
            name="title"
            value={type}
            onChange={(e) => setType(e.target.value)}
            onKeyDown={handleKeyDown} // Capture 'Enter' key press
            placeholder="Type and press Enter"
            className={styles["tag-card-input"]}
            required
            aria-label="Tag input"
          />
          <button
            className={styles["tag-close"]}
            onClick={toggleInput}
            aria-label="Close tag input field"
          >
            Close
          </button>
        </div>
      )}

      {/* Display all tags */}
      <div className={styles["tag-card-details"]}>
        {tags.map((tag, index) => (
          <span key={index} className={styles["tag-item"]}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tag;
