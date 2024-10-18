import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const authToken = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(404).send({ success: false, message: 'Token not found' })
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(err.message);
                return res.status(401).send({ success: false, message: "Invalid token" });
            }
            req.UID = decoded.UID
            next()
        })
    } catch (error) {
        console.error('Something went wrong in authToken:', error);
        res.status(500).send('Internal Server Error');
    }
}