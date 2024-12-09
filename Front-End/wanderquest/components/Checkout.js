import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "../Styles/Checkout.module.css";

// Stripe public key (replace with your actual key)
const stripePromise = loadStripe("pk_test_51QRfekFYbqa6jLuaRMO4BVWeTT2vPcWgVjQUcs09vEM6gcSRWBSm3gJ2VDpRvqpyXO7sCCqycrkJ5kyh1L08Z9jY00s1CRFhtE");

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [deliveryAddresses, setDeliveryAddresses] = useState([]);
    const [activeAddress, setActiveAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("wallet");
    const [totalPrice, setTotalPrice] = useState(0);
    const [newAddress, setNewAddress] = useState({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        googleMapsUrl: "",
    });
    const [addingNewAddress, setAddingNewAddress] = useState(false);

    // Fetch cart items, delivery addresses, and active address
    useEffect(() => {
        const fetchCartAndAddresses = async () => {
            try {
                // Fetch cart items
                const cartResponse = await fetch("http://localhost:4000/tourist/cart",{
                    credentials:"include"
                });
                const cartData = await cartResponse.json();
                setCartItems(cartData.cartItems);

                // Fetch delivery addresses
                const addressResponse = await fetch("http://localhost:4000/tourist/deliveryAddresses",{
                    credentials:"include"
                });
                const addressData = await addressResponse.json();
                setDeliveryAddresses(addressData.deliveryAddresses);
                setActiveAddress(addressData.activeAddress);

                // Calculate total price
                let total = 0;
                cartData.cartItems.forEach((item) => {
                    total += item.price * item.quantity;
                });
                setTotalPrice(total);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchCartAndAddresses();
    }, []);

    // Handle checkout
    const handleCheckout = async () => {
        if (!activeAddress) {
            alert("Please select or add a delivery address.");
            return;
        }

        const orderData = {
            cart: cartItems,
            deliveryAddress: activeAddress,
            paymentMethod: selectedPaymentMethod,
        };

        try {
            const checkoutResponse = await fetch("http://localhost:4000/tourist/cart/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
                credentials:"include"
            });
            const checkoutData = await checkoutResponse.json();
            if (checkoutResponse.ok) {
                alert("Order placed successfully!");
            } else {
                alert("Failed to place order: " + checkoutData.error);
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order.");
        }
    };

    // Handle address change (either select existing or input new address)
    const handleAddressChange = (addressId) => {
        setActiveAddress(addressId);
    };

    const handleNewAddressChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const handleAddNewAddress = async () => {
        try {
            const response = await fetch("http://localhost:4000/tourist/addDeliveryAddresses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ deliveryAddresses: [newAddress] }),
                credentials:"include"
            });
            const data = await response.json();
            if (response.ok) {
                setDeliveryAddresses((prevAddresses) => [...prevAddresses, newAddress]);
                setActiveAddress(newAddress); // Set newly added address as active
                setAddingNewAddress(false);
            } else {
                alert("Failed to add new address: " + data.error);
            }
        } catch (error) {
            console.error("Error adding new address:", error);
            alert("Error adding new address.");
        }
    };

    // Stripe payment component
    const PaymentSection = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handlePayment = async () => {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
            });

            if (error) {
                alert(error.message);
                return;
            }

            try {
                const response = await fetch("http://localhost:4000/tourist/cart/checkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        paymentMethodId: paymentMethod.id,
                        totalPrice: totalPrice,
                    }),
                    credentials:"include"
                });

                const paymentData = await response.json();
                if (response.ok && paymentData.success) {
                    alert("Payment successful!");
                } else {
                    alert("Payment failed.");
                }
            } catch (error) {
                console.error("Error processing payment:", error);
                alert("Payment failed.");
            }
        };

        return (
            <div className={styles.paymentsection}>
                <CardElement />
                <button className={styles.button} onClick={handlePayment}>Pay with Credit Card</button>
            </div>
        );
    };

    return (
        <div className={styles.checkout}>
            <h2>Checkout</h2>
            
            <div className={styles.cartitems}>
                <h3>Cart Items</h3>
                {cartItems.map((item) => (
                    <div key={item.id} className={styles.cartitem}>
                        <span>{item.name}</span>
                        <span>{item.quantity} x ${item.price}</span>
                    </div>
                ))}
            </div>

            <div className={styles.deliveryaddress} key="0">
                <h3>Select Delivery Address</h3>
                {deliveryAddresses.length === 0 ? (
                    <div>
                        <h4>No addresses available.</h4>
                        <button onClick={() => setAddingNewAddress(true)}>Add New Address</button>
                    </div>
                ) : (
                    deliveryAddresses.map((address) => (
                        <div
                            key={address._id}
                            className={`address ${address._id === activeAddress ? "active" : ""}`}
                            onClick={() => handleAddressChange(address._id)}
                        >
                            <p>{address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}</p>
                        </div>
                    ))
                )}

                {addingNewAddress && (
                    <div>
                        <h4>Enter New Address</h4>
                        <input
                            type="text"
                            name="street"
                            placeholder="Street"
                            value={newAddress.street}
                            onChange={handleNewAddressChange}
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={newAddress.city}
                            onChange={handleNewAddressChange}
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State (Optional)"
                            value={newAddress.state}
                            onChange={handleNewAddressChange}
                        />
                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            value={newAddress.postalCode}
                            onChange={handleNewAddressChange}
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={newAddress.country}
                            onChange={handleNewAddressChange}
                        />
                        <input
                            type="text"
                            name="googleMapsUrl"
                            placeholder="Google Maps URL"
                            value={newAddress.googleMapsUrl}
                            onChange={handleNewAddressChange}
                        />
                        <button onClick={handleAddNewAddress}>Add Address</button>
                    </div>
                )}
            </div>

            <div className={styles.paymentmethods}>
                <h3>Payment Methods</h3>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="wallet"
                        checked={selectedPaymentMethod === "wallet"}
                        onChange={() => setSelectedPaymentMethod("wallet")}
                    />
                    Wallet
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={selectedPaymentMethod === "credit-card"}
                        onChange={() => setSelectedPaymentMethod("credit-card")}
                    />
                    Credit Card
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={selectedPaymentMethod === "cash"}
                        onChange={() => setSelectedPaymentMethod("cash")}
                    />
                    Cash on Delivery
                </label>
            </div>

            {selectedPaymentMethod === "credit-card" && (
                <Elements stripe={stripePromise}>
                    <PaymentSection />
                </Elements>
            )}

            <div className={styles.ordersummary}>
                <h3>Order Summary</h3>
                <p>Total Price: ${totalPrice}</p>
            </div>

            <button onClick={handleCheckout}>Complete Order</button>
        </div>
    );
};

export default Checkout;
