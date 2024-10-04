"use client"
import { useState , useEffect } from "react";

const CompanyInfo = ({initialData, OnSubmit}) => {
    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [websiteLink, setWebsiteLink] = useState('');
    const [hotline, setHotline] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

    useEffect(() => {
        if (initialData) {
            setUsername(initialData.username || '');
            setEmail(initialData.email || '');
            setWebsiteLink(initialData.websiteLink || '');
            setHotline(initialData.hotline || '');
            setCompanyName(initialData.companyName || '');
            setCompanyAddress(initialData.companyAddress || '');
            setCompanyDescription(initialData.companyDescription || '');
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

            <label>Company Name:</label>
            <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />

            <label>Company Address:</label>
            <input
                type="text"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
            />

            <label>Company Description:</label>
            <input
                type="text"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
            />


            <label>Link to Website: </label>
            <input
                type="text"
                value={websiteLink}
                onChange={(e) => setWebsiteLink(e.target.value)}            
            />

            <label>Hotline:</label>
            <input
                type="text"
                value={hotline}
                onChange={(e) => setHotline(e.target.value)}
            />

            

            <button>Save Changes</button>

        </form>

    )

}
export default CompanyInfo