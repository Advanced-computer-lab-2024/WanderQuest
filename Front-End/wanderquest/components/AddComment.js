import React from 'react';
const AddComment = ({comment, setComment}) => {
    return ( 
        <div className="add-comment">
            <textarea value={comment} onChange={(e)=> setComment(e.target.value)} placeholder="Add a comment..."/>
        </div>
     );
}
 
export default AddComment;