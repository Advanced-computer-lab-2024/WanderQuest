import React, { useState, useEffect } from 'react';
import styles from '../Styles/AdminReviewRequests.module.css';

const AdminReviewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setDocuments([]);
    }
  };

  const handleAccept = (id) => console.log(`Accept request with ID: ${id}`);
  const handleReject = (id) => console.log(`Reject request with ID: ${id}`);
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
              <div className={styles.downloadButtonContainer}> {/* Apply the new class here */}
                {documents.map((doc, index) => {
                  return (
                    <div key={index} className="mb-4">
                      <a
                        href={`http://localhost:4000/authentication/getDocumentByFileID/${doc.fileID}`}
                        download={doc.filename} // Sets the downloaded file's name
                        className={`${styles.actionButton} ${styles.downloadButton}`}
                      >
                        Download Document {index + 1}
                      </a>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No documents available.</p>
            )}

            <div className="flex justify-end space-x-4 mt-4">
              <button
                className={`${styles.actionButton} ${styles.rejectButton}`}
                onClick={() => handleReject(selectedRequest._id || selectedRequest.id)}
              >
                Reject
              </button>
              <button
                className={`${styles.actionButton} ${styles.acceptButton}`}
                onClick={() => handleAccept(selectedRequest._id || selectedRequest.id)}
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
