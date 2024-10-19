import { db } from "../../utils/db.js";
import jwt from 'jsonwebtoken'

export const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        // console.log("UID", req.UID)
        if (!username) {
            return res.status(400).send({ success: false, error: 'Username is required' });
        }
        if (!password) {
            return res.status(400).send({ success: false, error: 'Password is required' });
        }

        const sql = 'SELECT * FROM users WHERE mobile = ? AND password = ?';
        const [result] = await db.query(sql, [username, password])
        if (result.length > 0) {
            const user = result[0]
            const token = jwt.sign({ userId: user.Id, UID: user.mobile }, process.env.SECRET_KEY, { expiresIn: '7d' })
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: true
            })
            return res.status(200).send({ success: true, message: 'Login successful', result, token });
        } else {
            return res.status(401).send({ success: false, message: 'Invalid credentials' });
        }

    } catch (error) {
        console.log('Something went wrong in loginController:', error.message);
        return res.status(500).send({
            success: false,
            message: 'Something went wrong in loginController',
        });
    }
};
