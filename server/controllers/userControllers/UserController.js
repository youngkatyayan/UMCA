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