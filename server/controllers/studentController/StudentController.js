import { db } from "../../utils/db.js";

export const allstudentCourses = async (req, res) => {
    try {
        const sql = `SELECT * FROM ordertable`; // Removed the incomplete WHERE clause
        const [result] = await db.query(sql);

        return res.status(200).send({ success: true, message: "Data retrieved successfully", result });
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getGroup controller", error: error.message });
    }
};



export const getStudAnnouncement = async (req, res) => {
    try {
        const sql = `select * from announcement where category = 'Students' `
        const [result] = await db.query(sql)

        return res.status(201).send({ success: true, result });
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in GetAnnouncement controller" });

    }
}