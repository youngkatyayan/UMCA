import { db } from "../../utils/db.js";

export const allstudentCourses = async (req, res) => {
    try {
        const sql = `SELECT * FROM ordertable`;
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
export const getStudentProceedDataController = async (req, res) => {
    try {
        const { decryptedMobile } = req.body
        if (!decryptedMobile) {
            return res.status(404).send({ success: false, message: 'decryptedMobile is required' });
        }
        const sql = `select * from ordertable where phone=?`
        const [result] = await db.query(sql, [decryptedMobile])
        if (result.length > 0) {
            return res.status(201).send({ success: true, result });
        }
        return res.status(404).send({ success: false, message: "Data not found" });
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in GetAnnouncement controller" });

    }
}