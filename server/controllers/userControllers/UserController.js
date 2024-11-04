import { db } from "../../utils/db.js";

export const getCourseController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ error: 'ID is required' });
        }

        const sql = `select * from course cross join category on course.categoryname=category.categoryname WHERE course.Id = ?`;
        const [result] = await db.query(sql, [id]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'Access Successfully',
                result,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Course not found',
            });
        }

    } catch (error) {
        console.error('Something went wrong in getCourseController:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong in getCourseController',
            error: error.message,
        });
    }
};

// most popular course 
export const displayCourseController = async (req, res) => {
    try {
        const sql = 'select * from course cross join category on course.categoryname=category.categoryname'
        const [result] = await db.query(sql)
        if (result) {
            return res.status(200).json({
                success: true,
                message: 'Access Successfully',
                result,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Course data not found',
            });
        }

    } catch (error) {
        console.error('Something went wrong in getCourseController:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong in getCourseController',
            error: error.message,
        });
    }
}

// promocode promoCodeController
export const promoCodeController = async (req, res) => {
    try {
        const { date, promoCode } = req.body

        if (!promoCode) {
            return res.status(404).send({ error: 'promoCode fields are required.' })
        }
        if (!date) {
            return res.status(404).send({ error: 'date fields are required.' })
        }

        const sql = `select * from offer where offerCode=?  AND StartDate <= ? AND EndDate >= ?`
        const [result] = await db.query(sql, [promoCode, date, date])
        if (result) {
            return res.status(200).send({
                success: true,
                message: 'Data accessed',
                result
            })
        }
        else {
            return res.status(400).send({
                success: false,
                message: 'Data not found',
            })
        }
    } catch (error) {
        console.error('Something went wrong in promoCodeController:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong in promoCodeController',
            error: error.message,
        });
    }
}

// orderCourseController
export const orderCourseController = async (req, res) => {
    try {
        const { name, phone, email, state, promoCode, district } = req.body
        const fields = { name, phone, email, state, promoCode, district }
        for (let [key, value] of Object.entries(fields)) {
            if (!value) {
                return res.status(404).send({ error: `${key} is required` })
            }
        }
        const sql = `select * from ordertable where email=? and phone=?`
        const [result] = db.query(sql, [email, phone])
        if (result) {
            return res.status(200).send({
                success: true,
                message: 'Data have in database',
                result
            })
        } else {
            const sql = `insert into ordertable (name, phone, email, state, promoCode, district ) values (?,?,?,?,?)`
            const [result] = db.query(sql, [name, phone, email, state, promoCode, district])
            if (result) {
                return res.status(201).send({
                    success: true,
                    message: 'Proceeded',
                    result
                })
            } else {
                return res.status(404).send({
                    success: false,
                    message: 'Something Went wrong',

                })
            }
        }


    } catch (error) {
        console.error('Something went wrong in orderCourseController:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong in orderCourseController',
            error: error.message,
        });
    }
}