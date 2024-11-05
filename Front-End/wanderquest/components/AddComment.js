"use client";
import React, { useState } from 'react';

const AddComment = ({ comment, setComment }) => {
    const [charCount, setCharCount] = useState(comment.length);
    const maxCharLimit = 250;

    const handleCommentChange = (e) => {
        const newComment = e.target.value;
        if (newComment.length <= maxCharLimit) {
            setComment(newComment);
            setCharCount(newComment.length);
        }
    };

    return (
        <div className="add-comment">
            <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
                aria-label="Comment box"
                style={{
                    padding: '1.2rem',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    width: '15rem',
                    height: '8rem',
                    resize: 'vertical',
                    outlineColor: '#1A6187', // Gives a visual cue for focused state
                }}
            />
            <div style={{ fontSize: '0.9rem', color: '#555', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                {charCount}/{maxCharLimit} characters
            </div>
        </div>
    );
}

export default AddComment;
