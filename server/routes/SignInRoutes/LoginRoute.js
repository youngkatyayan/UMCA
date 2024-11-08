import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import dotenv from 'dotenv'
import { db } from '../../utils/db.js'
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

    if (!amount || !currency) {
        return res.status(400).json({ success: false, message: "Invalid order details." });
    }

    const options = {
        amount: amount * 100, 
        currency,
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
router.post("/verify-payment", async (req, res) => {
    const { razorpay_order_id, CoId, razorpay_payment_id, razorpay_signature, email, phone, cname } = req.body;

    console.log(req.body)
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", "mQjbFUYncpUFulaMmAgDi13z")
        .update(body.toString())
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    const status = "Paid";
    try {
        await db.beginTransaction();

        const insertSql = "INSERT INTO coursetrans (TranctionId, status, payment_sign, payment_id, email, courseId, mobile, coursename) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const [insertResult] = await db.query(insertSql, [razorpay_order_id, status, razorpay_signature, razorpay_payment_id, email, CoId, phone, cname]);

        if (insertResult.affectedRows === 0) {
            throw new Error("Failed to insert transaction record");
        }

        const updateSql = "UPDATE ordertable SET status = ? WHERE email = ?";
        const [updateResult] = await db.query(updateSql, [status, email]);

        if (updateResult.affectedRows === 0) {
            throw new Error("Failed to update order status");
        }

        await db.commit();
        return res.status(200).json({ success: true, message: "Payment verified successfully" });

    } catch (error) {
        await db.rollback();
        console.error("Transaction error:", error);
        return res.status(500).json({
            success: false,
            message: "Payment processed but database operation failed. Please contact support."
        });
    }
});



export default router