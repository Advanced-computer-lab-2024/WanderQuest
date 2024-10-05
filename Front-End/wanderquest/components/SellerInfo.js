"use client"
import { useState , useEffect } from "react";
import styles from "../Styles/Profiles.module.css"

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
        <form className={styles.Profile}>
            <h3 className={styles.h1}>My profile</h3>
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