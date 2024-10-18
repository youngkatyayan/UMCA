import { db } from "../../utils/db.js";

export const authController = async (req, res) => {
    try {
        // Check if UID is present in the request
        if (!req.UID) {
            return res.status(400).send({
                success: false,
                message: 'UID is required',
            });
        }
        // console.log("UID", req.UID);       

        const sql = 'SELECT * FROM users WHERE mobile = ?';

        const [result] = await db.query(sql, [req.UID])
        if (result.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Access Token granted',
            result,
        });
} catch (error) {
    console.log('Something went wrong in authController:', error.message);
    return res.status(500).send({
        success: false,
        message: 'Something went wrong in authController',
    });
}
};
