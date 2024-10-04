'use client'
import { Html } from "next/document";
import React, { useState, useRef } from "react";
import styles from "/Styles/TagCard.module.css";
const generateID = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const Tag= () => {
    const [title, setTitle] = useState("");

    const idRef = useRef(generateID());
    const id = idRef.current;

    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = () => {
        setIsSubmitted(true);
    }
    return (
        <div className={styles["tag-card"]}>
      {!isSubmitted ? (
        <form className={styles["tag-card-form"]}onSubmit={handleSubmit}>
          <div className="tag-card-fields">
            <input
              type="text"
              id={`title-${id}`}
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className={styles["tag-card-input"]}
              required
            />
            
            <button id={`btnSubmit-${id}`} className={styles["tag-card-button"]}>
              Create Tag 
            </button>
          </div>
        </form>
      ) : (
        <div className={styles["tag-card-details"]}>
          <p>{title}</p>
          {/* <p>{id}</p> */}
        </div>
      )}
    </div>
  );
};

export default Tag;