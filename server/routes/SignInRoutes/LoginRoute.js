import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
import { loginController } from '../../controllers/signInControllers/LoginController.js'
// import { authToken } from '../../middlewares/AuthMiddleware.js'
const router = express.Router()

router.post('/login', loginController)


// payment gateway router

const razorpayInstance = new Razorpay({
    key_id: "rzp_live_cFGW0bIUY8JHu0",
    key_secret: "mQjbFUYncpUFulaMmAgDi13z",
});

// Endpoint to create an order
router.post("/create-order", async (req, res) => {
    const { amount, currency } = req.body;
    const options = {
        amount: amount * 100, // Convert amount to paise for Razorpay
        currency: currency,
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to verify payment signature
router.post("/verify-payment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", "mQjbFUYncpUFulaMmAgDi13z")
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        // const sql
        res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
        res.status(400).json({ success: false, message: "Payment verification failed" });
    }
});
export default router