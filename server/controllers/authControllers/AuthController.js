import { db } from "../../utils/db.js";

export const authController = async (req, res) => {
    try {
        console.log("UID",req.UID)    
 
    } catch (error) {
        console.log('Something went wrong in authController:', error.message);
        return res.status(500).send({
            success: false,
            message: 'Something went wrong in authController',
        });
    }
}