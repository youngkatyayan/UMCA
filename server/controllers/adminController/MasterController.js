import { db } from "../utils/db.js"

export const AddCategory = async (req, res) => {
    try {
        const { category } = req.body;

        const fetchSql = "SELECT EId FROM hremployee ORDER BY EId DESC LIMIT 1";
        db.query(fetchSql, (fetchErr, fetchResult) => {
            if (fetchErr) {
                console.error('Fetch Error:', fetchErr.message);
                return res.status(500).send({
                    success: false,
                    message: "Internal server error",
                    error: fetchErr.message,
                });
            }
            // Generate new EId
            let newCeid = "1001"; // Default starting EId if no records exist
            if (fetchResult.length > 0) {
                const lastEId = parseInt(fetchResult[0].EId, 10);
                newCeid = `${lastEId + 1}`;
            }

            const sql = 'INSERT INTO category ( Caid,category) VALUES (?,?)'
            const Values = [newCeid]
            db.query(sql, Values, (error, result) => {
                if (error) {
                    return res.status(500).send({ success: false, message: "internal server error", error: error.message })
                }
                if (result) {
                    return res.status(201).send({ success: true, result })

                }
            })

        })
    } catch (error) {

        return res.status(500).send({ success: false, message: "internal server error", error: error.message })
    }
}