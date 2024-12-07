'use client'

import React, { useState, useEffect } from 'react';
import styles from "/Styles/itineraries.module.css";
import Navbar from '../../../../../components/Navbar';


const ordersPage = () => {
    const [pastOrders, setPastOrders] = useState([]);
    const [onOrders, setOnOrders] = useState([]);

    const [touristID, setTouristID] = useState("");

    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        const fetchTourist = async () => {
            try {
                const response = await fetch('http://localhost:4000/tourist/profile',{
                    credentials: 'include',
                });
                const data = await response.json();
                const touristID = data._id;
                setTouristID(touristID);
                console.log('Tourist ID:', touristID);
            } catch (error) {
                console.error('Error fetching tourist:', error);
            }
        };
        fetchTourist();
    }, []);

    useEffect(()=> {
        const fetchOrders = async () => {
            try{
                const response = await fetch('http://localhost:4000/tourist/orders',{
                    credentials: 'include',
                });
                const data = await response.json();
                if(data.length !== 0){
                    for(let counter = 0; counter < data.length; counter++){
                        if(data[counter].status === 'sent to delivery' || data[counter].status === 'pending'){
                            setOnOrders(prev => [...prev, data[counter]]);
                        }else{
                            setPastOrders(prev => [...prev, data[counter]]);
                        }
                    }
                }
                if(onOrders.length === null){
                    setOnOrders([]);
                }
                if(pastOrders.length === null){
                    setPastOrders([]);
                }
            }catch(error){
                console.error("API Problem", error);
            }
        }
        fetchOrders();
    }, [lastUpdated]);

    const handleOrderCancel = async (e, id) => {
        e.preventDefault();
        const orderToCancel = onOrders.find(order => order._id === id); // Retrieve the canceled order.
    
        if (!orderToCancel) {
            console.log('Order not found');
            return;
        }
    
        const response = await fetch(`http://localhost:4000/tourist/orders/cancel/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
    
        if (response.ok) {
            setLastUpdated(id); // Assuming this triggers a re-fetch or re-render elsewhere.
            setOnOrders(prev => prev.filter(order => order._id !== id)); // Remove the order from active list.
            setPastOrders(prev => [...prev, { ...orderToCancel, status: 'canceled' }]); // Add to past orders.
        } else {
            console.log('Error cancelling order');
        }
    };

    return ( 

        <div>
            <Navbar/>
            <h2 className={styles.itineraryTitle}>Your Orders</h2>
            
            <h2 className={styles.itineraryTitle}>Active Orders</h2>
            <div className={styles.itinierary}>
                <div>
                    {onOrders.length > 0 ? (
                        onOrders.map((order,index) => (
                            <div key={index} className={styles.activity}>
                                <h2 className={styles.itineraryTitle}>Order</h2>
                                {/* <img src={order.picture} alt="Order Image" /> */}
                                <p><strong>Product(s):</strong></p>
                                {order.products.map((prod,index) => (
                                    <div key={index} className={styles.activity}>
                                        <p>{/*<strong>Product:</strong>*/}{prod.name}</p>
                                        <p><strong>Quantity:</strong>{prod.quantity}</p>
                                        <p><strong>Rating:</strong>{prod.rating ?? "N/A"}</p>
                                    </div>
                                ))}
                                <p><strong>Date of Order:</strong> {new Date(order.date).toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'})}</p>
                                <p><strong>Total Price:</strong>{order.totalPrice}</p>
                                <p><strong>Status:</strong>{order.status}</p>
                                <button className={styles.cancelButton} onClick={(e)=>handleOrderCancel(e, order._id)}>Cancel</button>
                            </div>
                        ))
                    ) : (
                        <p>No Current Orders</p>
                    )}
                </div>
            </div>
            
            <div>
            <h2 className={styles.itineraryTitle}>Previous Orders</h2>
            <div className={styles.itinierary}>
                <div>
                    {pastOrders.length > 0 ? (
                        pastOrders.map((order,index)=>(
                            <div key={index} className={styles.activity}>
                                <h2 className={styles.itineraryTitle}>Order</h2>
                                {/* <img src={order.picture} alt="Order Image" /> */}
                                <p><strong>Product(s):</strong></p>{order.products.map((prod,index) => (
                                    <div key={index} className={styles.activity}>
                                        <p>{/*<strong>Product:</strong>*/}{prod.name}</p>
                                        <p><strong>Quantity:</strong>{prod.quantity}</p>
                                        <p><strong>Rating:</strong>{prod.rating ?? "N/A"}</p>
                                    </div>
                                ))}
                                <p><strong>Date of Order:</strong> {new Date(order.date).toLocaleDateString(/*'en-US', {year:'numeric', month:'long', day:'numeric'}*/)}</p>
                                <p><strong>Total Price:</strong>{order.totalPrice}</p>
                                <p><strong>Status:</strong>{order.status}</p>
                            </div>
                        ))
                        ) : ( <p>No Orders Yet</p> )}
                </div>
            </div>
            </div>
        
        </div>

     );
}
 
export default ordersPage;