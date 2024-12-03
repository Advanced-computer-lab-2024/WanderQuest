"use client";

import { useState ,useEffect} from "react";
import styles from '../Styles/UploadDocuments.module.css'


const UploadDocuments = ({ userType, userId }) => {
    const [certificate,setCertificate]=useState('');
    const [taxRegistry,setTax]=useState('');
    const [message, setMessage] = useState(null);
    const [id, setID] = useState('');
    const [loading, setLoading] = useState(false);


    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (type === 'id') setID(file);
        if (type === 'certificate') setCertificate(file);
        if (type === 'taxRegistry') setTax(file);
    };
    
    const handleUpload = async () => {
        setLoading(true);

        const formData = new FormData();
        if (id) formData.append('documents', id);
        if (certificate) formData.append('documents', certificate);
        if (taxRegistry) formData.append('documents', taxRegistry);

        

        try {
            const response = await fetch(`http://localhost:4000/authentication/uploadDocuments`, {
                method: 'POST',
                body: formData,
                credentials:"include"
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMessage(errorData.error || 'An error occurred');
            } else {
                const data = await response.json();
                setMessage(data.message);
                setTimeout(() => setMessage(""), 3000);
                window.location.href = "/signin";
            }
        } catch (error) {
            setMessage('An error occurred');
        }finally {
            setLoading(false); // Hide loading spinner
        }
    };
    return (
        (userType === 'tourGuide' || userType === 'advertiser' || userType === 'seller') && (
            <div className={styles.UploadDocuments}>
                <h3>Upload Documents</h3>

                <label>ID: </label>
                <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'id')}
                    required
                />
                <br />
    
    
                
                {userType === 'tourGuide' && (
                    <>
                        <label>Certificate: </label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, 'certificate')}
                            required
                        />
                        <br />
                    </>
                )}
    

                {/* Tax Registry upload (for advertisers and sellers) */}
                {(userType === 'advertiser' || userType === 'seller') && (
                    <>
                        <label>Taxation Registry: </label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, 'taxRegistry')}
                            required
                        />
                        <br />
                    </>
                )}

                {/* Use type="button" to prevent form submission */}
                <button type="button" onClick={handleUpload} disabled={loading}>
                    {loading ? (
                        <div className={styles.spinner}></div>
                    ) : (
                        "Upload"
                    )}
                </button>
                {message && <p className={styles.message}>{message}</p>}
            </div>
        )
    );
};
export default UploadDocuments;