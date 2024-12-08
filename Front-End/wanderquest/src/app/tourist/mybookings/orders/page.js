'use client'

import React, { useState, useEffect } from 'react';
import styles from "/Styles/Bookings.module.css";
import Navbar from '../../../../../components/Navbar';
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Foot from "../../../../../components/foot";

function OrdersPage() {
  const [pastOrders, setPastOrders] = useState([]);
  const [onOrders, setOnOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState(6); // Set to 6 for orders
  const router = useRouter();

  const [multiplier, setMultiplier] = useState(1);
  const [preferredCurrency, setPreferredCurrency] = useState('USD');

  useEffect(() => {
    const fetchPaymentMultiplier = async () => {
      try {
        const response = await fetch('http://localhost:4000/payment/getPaymentMultiplier', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Automatically include credentials (user session)
        });

        if (response.ok) {
          const result = await response.json();
          setMultiplier(result.multiplier);
          setPreferredCurrency(result.currency);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
    fetchPaymentMultiplier();
  }, []);

  // Navigation functions
  const handleRedirect = (path, buttonId) => {
    setActiveButton(buttonId);
    router.push(`/tourist/mybookings/${path}`);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/tourist/orders', {
          credentials: 'include',
        });
        const data = await response.json();

        const activeOrders = [];
        const completedOrders = [];

        if (data.length !== 0) {
          data.forEach(order => {
            if (order.status === 'sent to delivery' || order.status === 'pending') {
              activeOrders.push(order);
            } else {
              completedOrders.push(order);
            }
          });
        }

        setOnOrders(activeOrders);
        setPastOrders(completedOrders);
        setLoading(false);
      } catch (error) {
        console.error("API Problem", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleOrderCancel = async (e, id) => {
    e.preventDefault();
    const orderToCancel = onOrders.find(order => order._id === id);

    if (!orderToCancel) {
      console.log('Order not found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/tourist/orders/cancel/${id}`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (response.ok) {
        setOnOrders(prev => prev.filter(order => order._id !== id));
        setPastOrders(prev => [...prev, { ...orderToCancel, status: 'canceled' }]);
        alert('Order cancelled successfully');
      } else {
        throw new Error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order');
    }
  };

  return (
    <div className={styles.all}>
      <Navbar />
      <div className={styles.top}>
        <div className={styles.container}>
          <div className={styles.navbtns}>
            <button
              onClick={() => handleRedirect('flights', 1)}
              className={`${styles.navbtn} ${activeButton === 1 ? styles.active : ""}`}
            >
              Flights
            </button>
            <button
              onClick={() => handleRedirect('transport', 2)}
              className={`${styles.navbtn} ${activeButton === 2 ? styles.active : ""}`}
            >
              Transportation
            </button>
            <button
              onClick={() => handleRedirect('activities', 3)}
              className={`${styles.navbtn} ${activeButton === 3 ? styles.active : ""}`}
            >
              Activities
            </button>
            <button
              onClick={() => handleRedirect('itiniraries', 4)}
              className={`${styles.navbtn} ${activeButton === 4 ? styles.active : ""}`}
            >
              Itineraries
            </button>
            <button
              onClick={() => handleRedirect('myhotels', 5)}
              className={`${styles.navbtn} ${activeButton === 5 ? styles.active : ""}`}
            >
              Hotels
            </button>
            <button
              onClick={() => handleRedirect('orders', 6)}
              className={`${styles.navbtn} ${activeButton === 6 ? styles.active : ""}`}
            >
              Orders
            </button>
          </div>
        </div>
        <h2 className={styles.welcome}>My Bookings</h2>
        <div className={styles.welcomeq}>
          Track and manage all your travel arrangements in one place.
        </div>
      </div>

      <motion.div
        className={styles.bookingsContainer}
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.ordersSection}>
          <h2 className={styles.sectionTitle}>Active Orders</h2>
          <div className={styles.bookingsList}>
            {loading ? (
              <p>Loading...</p>
            ) : onOrders.length === 0 ? (
              <p>No active orders</p>
            ) : (
              onOrders.map((order, index) => (
                <div key={index} className={styles.bookingCard}>
                  <h3>Order</h3>
                  <div className={styles.productsList}>
                    {order.products.map((prod, idx) => (
                      <div key={idx} className={styles.productItem}>
                        <p><strong>Product:</strong> {prod.name}</p>
                        <p><strong>Quantity:</strong> {prod.quantity}</p>
                        <p><strong>Rating:</strong> {prod.rating ?? "N/A"}</p>
                      </div>
                    ))}
                  </div>
                  <p><strong>Date of Order:</strong> {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                  <p><strong>Total Price:</strong> {order.totalPrice * multiplier} {preferredCurrency}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <button
                    className={styles.cancelButton}
                    onClick={(e) => handleOrderCancel(e, order._id)}
                  >
                    Cancel Order
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.ordersSection}>
          <h2 className={styles.sectionTitle}>Previous Orders</h2>
          <div className={styles.bookingsList}>
            {loading ? (
              <p>Loading...</p>
            ) : pastOrders.length === 0 ? (
              <p>No previous orders</p>
            ) : (
              pastOrders.map((order, index) => (
                <div key={index} className={styles.bookingCard}>
                  <h3>Order</h3>
                  <div className={styles.productsList}>
                    {order.products.map((prod, idx) => (
                      <div key={idx} className={styles.productItem}>
                        <p><strong>Product:</strong> {prod.name}</p>
                        <p><strong>Quantity:</strong> {prod.quantity}</p>
                        <p><strong>Rating:</strong> {prod.rating ?? "N/A"}</p>
                      </div>
                    ))}
                  </div>
                  <p><strong>Date of Order:</strong> {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                  <p><strong>Total Price:</strong> {order.totalPrice * multiplier} {preferredCurrency}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
      <Foot />
    </div>
  );
}

export default OrdersPage;