import { db } from "../../utils/db.js";

export const loginController = async (req, res) => {
    try {

    } catch (error) {
        console.log('Something wrong in loginController', error.message)
        res.status(500).send({
            success: false,
            message: 'Something wrong in loginController'
        })
    }
}