"use client"
import { useState , useEffect } from "react";

const SellerInfo = ({initialData, OnSubmit}) => {
    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name,setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (initialData) {
            setUsername(initialData.username || '');
            setEmail(initialData.email || '');
            setName(initialData.name || '');
            setDescription(initialData.description || '');
        }
    }, [initialData]);


    return(
        <form className="CompanyProfile">
            <h3>My profile</h3>
            <label>Username: </label>
            <input
                type="text"
                value={username}
                required
            />

            <label>Email: </label>
            <input
                type="text"
                value={email}
                required
            />

            <label>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label>Description:</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button>Save Changes</button>

        </form>

    )



}
export default SellerInfo