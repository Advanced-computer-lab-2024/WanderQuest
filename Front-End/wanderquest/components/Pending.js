import React, { useState, useEffect } from 'react';
import styles from '../Styles/AdminReviewRequests.module.css';

const AdminReviewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showConfirmReject, setShowConfirmReject] = useState(false); // New state for reject confirmation
  const [isAcceptedMessage, setIsAcceptedMessage] = useState(null); // New state to track accept/reject message

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:4000/authentication/getUsersRequestingAcceptance',{
          credentials:"include"
        });
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
      setDocuments(data.map((doc) => ({ ...doc, userId })));
    } catch (error) {
      console.log("Error fetching documents:", error);
      setDocuments([]);
    }
  };

  const handleAcceptReject = async (id, accepted) => {
    try {
      const response = await fetch(`http://localhost:4000/authentication/acceptUser/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accepted }),
      });
      if (!response.ok) throw new Error("Failed to update user");

      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));
      setMessage(`User has been ${accepted ? 'accepted' : 'rejected'}`);
      setIsAcceptedMessage(accepted); // Set accept/reject status here
      closeDocument(); // Close the document modal after accept/reject
    } catch (error) {
      console.log("Error updating user:", error);
      setMessage("Error updating user.");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const openDocument = (request) => {
    setSelectedRequest(request);
    fetchDocuments(request._id || request.id);
  };

  const closeDocument = () => {
    setSelectedRequest(null);
    setDocuments([]);
    setShowConfirmReject(false); // Close the confirm dialog if open
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registration Requests</h1>
      {message && (
        <div className={isAcceptedMessage ? styles.acceptMessage : styles.rejectMessage}>
          {message}
        </div>
      )}
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
                    <a
                      href={`http://localhost:4000/authentication/getDocumentByFileID/${doc.fileID}`}
                      download={doc.filename}
                      className={`${styles.actionButton} ${styles.downloadButton}`}
                    >
                      Download {doc.filename}
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
                onClick={() => setShowConfirmReject(true)} // Show confirmation dialog
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

          {showConfirmReject && (
            <div className={styles.confirmOverlay}>
              <div className={styles.confirmDialog}>
                <p>Are you sure you want to reject this request?</p>
                <div className={styles.buttonContainer}>
                  <button
                    className={`${styles.actionButton} ${styles.rejectButton}`}
                    onClick={() => handleAcceptReject(selectedRequest._id || selectedRequest.id, false)}
                  >
                    Yes
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.viewButton}`}
                    onClick={() => {
                      setShowConfirmReject(false); // Only closes confirm dialog
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminReviewRequests;