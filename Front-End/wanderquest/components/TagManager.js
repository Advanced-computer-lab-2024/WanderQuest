'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '/Styles/TagManager.module.css'; 
import Image from 'next/image'; 
import Subtle from '/imgs/subtle.jpg'; 

const TagManager = () => {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:4000/tourismGovernor/tags', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tagInput.trim()) {
      setMessage({ type: 'error', text: 'Tag cannot be empty.' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/tourismGovernor/addTag', {
        type: tagInput,
        credentials: 'include',
      });
      setTags([...tags, response.data]);
      setMessage({ type: 'success', text: 'Tag added successfully!' });
      setTagInput('');
      setIsInputVisible(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while adding the tag.' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <Image src={Subtle} alt="Subtle background" layout="fill" objectFit="cover" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h1>Tag Manager</h1>
        </div>
      </div>
      <div className={styles.layout}>
        {/* Form Section */}
        <div className={styles.header}>
    <div className={styles.buttonWrapper}>
      {/* Add Tag Button */}
      
    </div>
  </div>

  {/* Add Tag Form */}
  
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={tagInput}
        onChange={handleInputChange}
        placeholder="Enter a new tag"
        className={styles.input}
      />
      <button className={styles.button} type="submit">Submit</button>
      {message.text && (
      <div className={message.type === 'error' ? styles.error : styles.success}>
        {message.text}
      </div>
  )}
    </form>
  

  
  {/* Tags List Panel */}
   
    <div className={styles.tagsList}>
      <h2>Existing Tags</h2>
      {tags.length === 0 ? (
        <p>No tags found.</p>
      ) : (
        <div className={styles.tagScroll}>
          <ul className={styles.tagGrid}>
            {tags.map((tag) => (
              <p key={tag._id} className={styles.tagItem}>
                <span>{tag.type}</span>
              </p>
            ))}
          </ul>
        </div>
      )}
    </div>
  


      </div>
    </div>
  );
};

export default TagManager;
