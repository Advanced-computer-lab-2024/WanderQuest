import React, { useState } from 'react';

const ComplaintCard = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    }
    const handleSubmit= () =>{
        console.log(title);
        console.log(body);
        console.log(date);
    }
        // Log the title state whenever it changes
    



    return (
        <div>
            <h1>Complaint Card</h1>
            <label>Title</label>
            <input type="text" value={title} onChange={handleTitleChange} required />
            <label>Body</label>
            <input type="text" value={body} onChange={handleBodyChange} required />
            <label>Date</label>
            <input type="date" value ={date} onChange={handleDateChange}required />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default ComplaintCard;