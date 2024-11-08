import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import dotenv from 'dotenv'
import { db } from '../../utils/db.js'
import nodemailer from 'nodemailer'
dotenv.config()
import { loginController,logoutController } from '../../controllers/signInControllers/LoginController.js'
// import { authToken } from '../../middlewares/AuthMiddleware.js'
const router = express.Router()

router.post('/login', loginController)
router.delete('/logout', logoutController)


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

    console.log(req.body);
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", "mQjbFUYncpUFulaMmAgDi13z")
        .update(body.toString())
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    const status = "Paid";
    let connection;

    try {

        connection = await db.getConnection();
        await connection.beginTransaction();

        const insertSql = `
            INSERT INTO coursetrans 
            (TranctionId, status, payment_sign, payment_id, email, courseId, mobile, coursename) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [insertResult] = await connection.query(insertSql, [
            razorpay_order_id,
            status,
            razorpay_signature,
            razorpay_payment_id,
            email,
            CoId,
            phone,
            cname
        ]);

        if (insertResult.affectedRows === 0) {
            throw new Error("Failed to insert transaction record");
        }

        const updateSql = "UPDATE ordertable SET status = ? WHERE email = ?";
        const [updateResult] = await connection.query(updateSql, [status, email]);

        if (updateResult.affectedRows === 0) {
            throw new Error("Failed to update order status");
        }

        await connection.commit();
        return res.status(200).json({ success: true, message: "Payment verified successfully" });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Transaction error:", error);

        return res.status(500).json({
            success: false,
            message: "Payment processed but database operation failed. Please contact support."
        });
    } finally {
        if (connection) connection.release();
    }
});


// send password to user 
router.post("/send-password", async (req, res) => {
    const { email } = req.body;
    console.log("Requested email:", email);

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const query = 'SELECT * FROM users WHERE email = ?';
        const [result] = await db.query(query, [email]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result[0];
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Go to Your Dashboard',
            html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; max-width: 600px;">
            <h2 style="color: #4CAF50;">Welcome to Your Dashboard!</h2>
            <p>Hello,</p>
            <p>We received a request to access your dashboard. Here are your login details:</p>
            <div style="background-color: #f9f9f9; padding: 15px; border: 1px dashed #ccc; border-radius: 5px; margin: 10px 0;">
                <strong style="color: #333;">Your Password:</strong> 
                <span style="font-size: 16px; color: #ff5722;">${user.password}</span>
            </div>
            <p>Please keep this information secure, and do not share it with anyone.</p>
            <p style="margin-top: 20px;">If you didn’t request this email, please contact our support team.</p>
            <p>Thank you,<br>Your Company Name</p>
        </div>
    `,
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Error sending email:", err);
                return res.status(500).json({ message: 'Error sending email' });
            }
            console.log("Email sent:", info.response);
            return res.status(200).json({ success: true, message: 'Password sent successfully!' });
        });
    } catch (error) {
        console.error("Error in send-password route:", error);
        res.status(500).json({ message: 'An error occurred' });
    }
});


export default router