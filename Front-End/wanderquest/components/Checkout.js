import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "../Styles/Checkout.module.css";
import Foot from "../components/foot";
import { motion } from "framer-motion";

// Stripe public key (replace with your actual key)
const stripePromise = loadStripe("pk_test_51QRfekFYbqa6jLuaRMO4BVWeTT2vPcWgVjQUcs09vEM6gcSRWBSm3gJ2VDpRvqpyXO7sCCqycrkJ5kyh1L08Z9jY00s1CRFhtE");

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [deliveryAddresses, setDeliveryAddresses] = useState([]);
    const [activeAddress, setActiveAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("wallet");
    const [totalPrice, setTotalPrice] = useState(0);
    const [preferredCurrency, setPreferredCurrency] = useState('USD');
    const [newAddress, setNewAddress] = useState({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        googleMapsUrl: "",
    });
    const [addingNewAddress, setAddingNewAddress] = useState(false);
    const [promoCode, setPromoCode] = useState("");

    // Fetch cart items, delivery addresses, and active address
    useEffect(() => {
        const fetchCartAndAddresses = async () => {
            try {
                // Fetch cart items
                const cartResponse = await fetch("http://localhost:4000/tourist/cart", {
                    credentials: "include",
                });
                const cartData = await cartResponse.json();
                console.log("Cart items:", cartData); // Log cart items

                // Ensure each item has a valid `id` field
                const formattedCartItems = cartData.map((item) => ({
                    id: item._id || item.id, // Use `_id` or `id` from the backend
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                }));
                setCartItems(formattedCartItems);

                // Fetch delivery addresses
                const addressResponse = await fetch("http://localhost:4000/tourist/deliveryAddresses", {
                    credentials: "include",
                });
                const addressData = await addressResponse.json();
                setDeliveryAddresses(addressData.deliveryAddresses);
                setActiveAddress(addressData.activeAddress);

                // Calculate total price
                let total = 0;
                formattedCartItems.forEach((item) => {
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

        console.log("Order data:", orderData); // Log order data

        try {
            const checkoutResponse = await fetch("http://localhost:4000/tourist/cart/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
                credentials: "include",
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
        const selectedAddress = deliveryAddresses.find((address) => address._id === addressId);
        setActiveAddress(selectedAddress);
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
                credentials: "include",
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
                    credentials: "include",
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

    const imageMap = {
        'Mountain Hiking Boots': '/hikingboots.avif',
        'Yoga Mat': '/yogamat.jpg',
        'Travel Backpack': '/travelpack.jpg',
        'Passport Holder': '/passportholder.jpg',
        'Sunscreen': '/sunscreen.jpg',
        'Neck Pillow': '/neckpillow.jpg',
        'Travel Adapter': '/traveladapter.jpg',
        'Luggage Tag': '/traveltage.webp',
        'Packing Cubes': '/Packing Cubes.webp',
        'Hiking Gloves': '/hiking gloves.jpg',
        'Portable Charger': '/portable charger.webp',
        'Travel Guidebook': '/Travel Guidebook.webp',
        'Sunglasses': '/sunglasses.jpg',
        'Reusable Water Bottle': '/reusable water bottle.webp'
    };

    return (
        <>
            <div className={styles.checkout}>
                <div className={styles.checkoutContainer}>
                    <h1>Cart Items</h1>
                    <div className={styles.cartitems}>
                        {cartItems && cartItems.map((item) => (
                            <div key={item.id} className={styles.cartitem}>
                                <img src={imageMap[item.name]} alt={item.name} className={styles.image} />
                                <span>{item.name}</span>
                                <span> {item.price} {preferredCurrency}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.deliveryaddress} key="0">
                        <h3>Delivery Address</h3>
                        {deliveryAddresses.length === 0 ? (
                            <div>
                                <button onClick={() => setAddingNewAddress(true)}>Add New Address</button>
                            </div>
                        ) : (
                            deliveryAddresses.map((address) => (
                                <div
                                    key={address._id}
                                    className={`address ${address._id === activeAddress?._id ? "active" : ""}`}
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
                </div>
                <div className={styles.paymentContainer}>
                    <div className={styles.paymentmethods}>
                        <h1 style={{ marginTop: "0px", marginBottom: "10px" }}>Checkout</h1>
                        <hr />
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
                    <hr />
                    <div className={styles.ordersummary}>
                        <h3>Order Summary</h3>
                        <div className={styles.summary}>
                            <span>Subtotal: </span>
                            <span> {totalPrice}</span>
                        </div>
                        <div className={styles.summary}>
                            <span>Shipping:</span>
                            <span> 10.00</span>
                        </div>
                        <hr />
                        <div className={styles.summary}>
                            <p>Total Price: </p>
                            <p>{promoCode === 'disc10' ? totalPrice - 10 : totalPrice + 10} {preferredCurrency}</p>
                        </div>
                        <button className={styles.promocodebutton} onClick={() => setPromoCode('disc10')}>Apply</button>
                        <input className={styles.promocode} type="text" placeholder="Promo Code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    </div>

                    <button onClick={handleCheckout} className={styles.completeorder}>Complete Order</button>
                </div>
            </div>
            <Foot />
        </>
    );
};

export default Checkout;