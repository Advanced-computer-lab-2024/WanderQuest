import { Html } from "next/document";
import React, { useState, useRef } from "react";
const generateID = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const TagCard= () => {
    const [title, setTitle] = useState("");

    const idRef = useRef(generateID());
    const id = idRef.current;

    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = () => {
        setIsSubmitted(true);
    }
    return (
        <div className="tag-card">
      {!isSubmitted ? (
        <form className="tag-card-form" onSubmit={handleSubmit}>
          <div className="tag-card-fields">
            <label htmlFor={`title-${id}`} className="tag-card-label">Title:</label>
            <input
              type="text"
              id={`title-${id}`}
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter tag title"
              className="tag-card-input"
              required
            />
            
            <button id={`btnSubmit-${id}`} type="submit" className="tag-card-button">
              Create Tag 
            </button>
          </div>
        </form>
      ) : (
        <div className="tag-card-details">
          <p><strong>Title:</strong> {title}</p>
          <p><strong>ID:</strong> {id}</p>
        </div>
      )}
    </div>
  );
};

export default TagCard;