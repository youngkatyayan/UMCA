import { db } from "../../utils/db.js";

export const getGroup = async (req, res) => {
    try {
        const sql = `select * from ordertable where `
        const [result] = await db.query(sql)

        return res.status(201).send({ success: true, message: "Category Inserted Successfully", result });
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getGroup controller" });

    }
}