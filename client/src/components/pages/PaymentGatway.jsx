import dotenv from 'dotenv'
import React from "react";
import axios from "axios";
dotenv.config()
const PaymentGatway = () => {
    const handlePayment = async () => {
        try {
            const orderResponse = await axios.post("/create-order", {
                amount: 500, 
                currency: "INR",
            });
            const { order } = orderResponse.data;
            const options = {
                key: "YOUR_RAZORPAY_KEY_ID", 
                amount: order.amount,
                currency: order.currency,
                name: "Your Company Name",
                description: "Payment for services",
                order_id: order.id, // Order ID from Razorpay
                handler: async (response) => {
                    // Step 4: Verify payment on the backend
                    const paymentResult = await axios.post("/verify-payment", response);
                    if (paymentResult.data.success) {
                        alert("Payment successful!");
                    } else {
                        alert("Payment verification failed");
                    }
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "1234567890",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error initiating payment:", error);
        }
    };

    return (
        <div>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default PaymentGatway;
