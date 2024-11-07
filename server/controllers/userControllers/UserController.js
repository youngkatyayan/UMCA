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
// promocode promoCodeController
export const promoCodeController = async (req, res) => {
    try {
        const { date, promoCode } = req.body;

        if (!promoCode) {
            return res.status(400).send({ error: 'promoCode field is required.' });
        }
        if (!date) {
            return res.status(400).send({ error: 'date field is required.' });
        }

        const sql = `SELECT * FROM offer WHERE offerCode = ? AND StartDate <= ? AND EndDate >= ?`;
        const [result] = await db.query(sql, [promoCode, date, date]);

        if (result.length > 0) {
            return res.status(200).send({
                success: true,
                message: 'Data accessed',
                result,
            });
        } else {
            return res.status(400).send({
                success: false,
                message: 'Invalid promo code.',
            });
        }
    } catch (error) {
        console.error('Something went wrong in promoCodeController:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong in promoCodeController',
            error: error.message,
        });
    }
};



// orderCourseController
export const orderCourseController = async (req, res) => {
    try {
        const { name, phone, email, state, promoCode, district, course } = req.body;
        const fields = { name, phone, email, state, district, course };

        for (let [key, value] of Object.entries(fields)) {
            if (!value) {
                return res.status(400).json({ error: `${key} is required` });
            }
        }

        const checkSql = `SELECT * FROM ordertable WHERE email = ? AND phone = ? AND course=?`;
        const [existingRecords] = await db.query(checkSql, [email, phone,course]);

        if (existingRecords.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'Data already exists in the database',
                result: existingRecords,
            });
        } else {
            // Insert data into `ordertable`
            const insertOrderSql = `INSERT INTO ordertable (name, phone, email, state, promoCode, district, course) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const [insertOrderResult] = await db.query(insertOrderSql, [name, phone, email, state, promoCode, district, course]);

            if (insertOrderResult.affectedRows > 0) {
                const Type = "Student"
                const Status = "2"
                const password = Math.floor(parseInt(phone.slice(6),10) + Math.random() * 900000);

                const insertUserSql = `INSERT INTO users (name, email,mobile,Type,Status,password) VALUES (?, ?,?,?,?,?)`;
                const [insertUserResult] = await db.query(insertUserSql, [name, email, phone, Type, Status, password]);

                if (insertUserResult.affectedRows > 0) {
                    return res.status(201).json({
                        success: true,
                        message: 'Record successfully inserted in both tables',
                        result: {
                            order: insertOrderResult,
                            user: insertUserResult,
                        },
                    });
                } else {
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to insert the record in the users table',
                    });
                }
            } else {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to insert the record in the ordertable',
                });
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
};


