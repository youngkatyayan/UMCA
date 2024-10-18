import { db } from "../../utils/db.js";
import jwt from 'jsonwebtoken'

export const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username) {
            return res.status(400).send({ success: false, error: 'Username is required' });
        }
        if (!password) {
            return res.status(400).send({ success: false, error: 'Password is required' });
        }

        // Query to find user by mobile and password
        const sql = 'SELECT * FROM users WHERE mobile = ? AND password = ?';
        db.query(sql, [username, password], (err, result) => {
            if (err) {
                console.log('Database error:', err.message);
                return res.status(502).send({ success: false, message: 'Internal server error' });
            }

            // Check if a user was found
            if (result.length > 0) {
                const user = result[0]
                const token = jwt.sign({ userId: user.Id, UID: user.mobile }, process.env.SECRET_KEY, { expiresIn: '7d' })
                // console.log("Token= ", token)
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 7*24*60*60*1000,
                    secure: true
                })
                return res.status(200).send({ success: true, message: 'Login successful', result,token });
            } else {
                return res.status(401).send({ success: false, message: 'Invalid credentials' });
            }
        });
    } catch (error) {
        console.log('Something went wrong in loginController:', error.message);
        return res.status(500).send({
            success: false,
            message: 'Something went wrong in loginController',
        });
    }
};
