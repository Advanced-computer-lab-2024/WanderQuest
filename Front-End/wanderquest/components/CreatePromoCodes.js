import React, { useState, useEffect } from 'react';
import styles from "../../wanderquest/Styles/CreatePromoCodes.module.css";

const CreatePromoCodes = () => {
  const [code, setCode] = useState('');
  const [type, setType] = useState(''); // Initially empty, no default type
  const [discount, setDiscount] = useState('');
  const [promoCodes, setPromoCodes] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch promo codes on component mount
  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/promocodes', {
          credentials: "include"
        });
        if (response.ok) {
          const data = await response.json();
          setPromoCodes(data);
        } else {
          setError('Failed to fetch promo codes');
        }
      } catch (error) {
        setError('Error fetching promo codes');
      }
    };

    fetchPromoCodes();
  }, []);

  const resetMessages = () => {
    setTimeout(() => {
      setError('');
      setSuccessMessage('');
    }, 5000); // Reset messages after 5 seconds
  };

  // Handle creating a promo code
  const handleCreatePromoCode = async () => {
    setError('');
    setSuccessMessage('');

    if (!code || !type || !discount) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/admin/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, type, discount }),
        credentials: "include"
      });

      if (response.ok) {
        const newPromo = await response.json();
        setPromoCodes((prev) => [...prev, newPromo]);
        setCode('');
        setType(''); // Reset type to empty
        setDiscount('');
        setSuccessMessage('Promo code created successfully');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create promo code');
      }
    } catch (error) {
      setError('Error creating promo code');
    }
  };

  // Handle deleting a promo code
  const handleDeletePromoCode = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/promocodes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPromoCodes((prev) => prev.filter((promo) => promo._id !== id));
        setSuccessMessage('Promo code deleted successfully');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete promo code');
      }
    } catch (error) {
      setError('Error deleting promo code');
    } finally {
      resetMessages();
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDeletePromoCode = async () => {
    try {
      const response = await fetch(`http://localhost:4000/admin/promocodes/${deleteId}`, {
        method: 'DELETE',
        credentials: "include"
      });

      if (response.ok) {
        setPromoCodes((prev) => prev.filter((promo) => promo._id !== deleteId));
        setSuccessMessage('Promo code deleted successfully');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete promo code');
      }
    } catch (error) {
      setError('Error deleting promo code');
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
      resetMessages();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Create Promo Code</h2>
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}

        <input
          type="text"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={styles.input}
        />

        {/* Type as a dropdown with placeholder */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={styles.input}
        >
          <option value="">Choose Type</option> {/* Placeholder option */}
          <option value="PERCENTAGE">PERCENTAGE</option>
          <option value="FIXED">FIXED</option>
        </select>

        <input
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleCreatePromoCode} className={styles.button}>
          Create Promo Code
        </button>
      </div>

      <div className={styles.list}>
        <h2>Existing Promo Codes</h2>
        <ul className={styles.ul}>
          {promoCodes.map((promo) => (
            <li key={promo._id} className={styles.li}>
              {promo.code} - {promo.type} - {promo.discount}%
              <button
                onClick={() => handleDeleteClick(promo._id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to delete this promo code?</p>
            <button onClick={confirmDeletePromoCode} className={styles.confirmButton}>
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className={styles.cancelButton}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePromoCodes;
