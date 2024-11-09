import React, { useState, useEffect } from 'react';
import styles from '../Styles/AdminReviewRequests.module.css';

const AdminReviewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:4000/authentication/getUsersRequestingAcceptance');
        if (!response.ok) throw new Error("Failed to fetch requests");
        const users = await response.json();
        setRequests(users);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const fetchDocuments = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/authentication/getDocuments/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch documents");
      const data = await response.json();

      // Wrap documents with the userId for easy identification
      setDocuments(data.map((doc) => ({ ...doc, userId })));
    } catch (error) {
      console.error("Error fetching documents:", error);
      setDocuments([]);
    }
  };

  const handleAcceptReject = async (id, accepted) => {
    console.log('Updating user with ID:', id, 'Accepted:', accepted);

    try {
        const response = await fetch(`http://localhost:4000/authentication/acceptUser/${id}`, {
            method: 'PATCH',  // Updated method to PATCH
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accepted }),
        });
        if (!response.ok) throw new Error("Failed to update user");

        setRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));
        setMessage(`User has been ${accepted ? 'accepted' : 'rejected'}`);
    } catch (error) {
        console.log("Error updating user:", error);
        setMessage("Error updating user.");
    } finally {
        setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    }
};

  
  const openDocument = (request) => {
    setSelectedRequest(request);
    fetchDocuments(request._id || request.id);
  };
  const closeDocument = () => {
    setSelectedRequest(null);
    setDocuments([]);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registration Requests</h1>
      {message && <div className={styles.message}>{message}</div>}
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.tableCell}>Email</th>
            <th className={styles.tableCell}>Role</th>
            <th className={styles.tableCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request._id || request.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{request.email}</td>
                <td className={styles.tableCell}>{request.role}</td>
                <td className={styles.tableCell}>
                  <button
                    className={`${styles.actionButton} ${styles.viewButton}`}
                    onClick={() => openDocument(request)}
                  >
                    View Documents
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.tableCell}>
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedRequest && (
        <>
          <div className={styles.modalOverlay} onClick={closeDocument} />
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Documents for {selectedRequest.name}</h3>
            {documents.length > 0 ? (
              <div className={styles.downloadButtonContainer}>
                {documents.map((doc, index) => (
                  <div key={index} className="mb-4">
                    <p>User ID: {doc.userId}</p> {/* Display the user ID associated with each document */}
                    <a
                      href={`http://localhost:4000/authentication/getDocumentByFileID/${doc.fileID}`}
                      download={doc.filename}
                      className={`${styles.actionButton} ${styles.downloadButton}`}
                    >
                      Download Document {index + 1}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p>No documents available.</p>
            )}

<div className={styles.buttonContainer}>
  <button
    className={`${styles.actionButton} ${styles.rejectButton}`}
    onClick={() => handleAcceptReject(selectedRequest._id || selectedRequest.id, false)}
  >
    Reject
  </button>
  <button
    className={`${styles.actionButton} ${styles.acceptButton}`}
    onClick={() => handleAcceptReject(selectedRequest._id || selectedRequest.id, true)}
  >
    Accept
  </button>
  <button
    className={`${styles.actionButton} ${styles.viewButton}`}
    onClick={closeDocument}
  >
    Close
  </button>
</div>

          </div>
        </>
      )}
    </div>
  );
};

export default AdminReviewRequests;