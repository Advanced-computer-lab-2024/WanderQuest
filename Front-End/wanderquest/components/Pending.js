'use client';
import React, { useState, useEffect } from 'react';

const AdminReviewRequests = () => {
  const [requests, setRequests] = useState([]); // Initialize as an array
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
        try {
          const response = await fetch('http://localhost:4000/authentication/getDocuments/:id'); // Replace with actual user ID
          if (!response.ok) {
            throw new Error("Failed to fetch requests");
          }
          const data = await response.json();
          console.log("Fetched data:", data);
          setRequests(Array.isArray(data) ? data : []);
        } catch (error) {
          console.log("Error fetching requests:", error);
          setRequests([]); // Default to empty array on error
        } finally {
          setLoading(false);
        }
      };
      

    fetchRequests();
  }, []);

  const handleAccept = (id) => {
    console.log(`Accept request with ID: ${id}`);
    // Implement accept logic
  };

  const handleReject = (id) => {
    console.log(`Reject request with ID: ${id}`);
    // Implement reject logic
  };

  const openDocument = (request) => {
    setSelectedRequest(request);
  };

  const closeDocument = () => {
    setSelectedRequest(null);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Registration Requests</h1>
      {/* Requests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request._id || request.id} className="border p-4 rounded shadow-md bg-white">
              <h2 className="text-lg font-semibold">{request.name}</h2>
              <p className="text-sm text-gray-500">{request.email}</p>
              <p className="mt-2 text-sm">
                <span className="font-semibold">Role: </span>{request.role}
              </p>
              <button
                className="mt-4 text-blue-500 underline"
                onClick={() => openDocument(request)}
              >
                View Document
              </button>
            </div>
          ))
        ) : (
          <p>No requests found.</p>
        )}
      </div>

      {/* Document Preview Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Document for {selectedRequest.name}</h3>
            <iframe
              src={selectedRequest.documentUrl}
              className="w-full h-64 mb-4"
              title={`Document for ${selectedRequest.name}`}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleReject(selectedRequest._id || selectedRequest.id)}
              >
                Reject
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleAccept(selectedRequest._id || selectedRequest.id)}
              >
                Accept
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeDocument}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviewRequests;
