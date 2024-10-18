import { db } from "../../utils/db.js";

export const addGroup = async (req, res) => {
    const connection = await db.getConnection(); // Get a database connection

    try {
        console.log(req.body);
        const { group } = req.body;

        await connection.beginTransaction(); // Start a transaction

        // Get the last GId
        const ssql = `SELECT GId FROM groups ORDER BY GId DESC LIMIT 1`;
        const [result] = await connection.query(ssql); // Await the result of the query

        let newGId = 1001; // Default new GId
        if (result.length > 0) {
            const GId = result[0].GId;
            const lastGId = parseInt(GId, 10);
            newGId = lastGId + 1; // Increment GId
        }

        // Insert the new group
        const sql = `INSERT INTO groups (GId, groupname) VALUES (?, ?)`;
        const values = [newGId, group];
        await connection.query(sql, values); // Await the insert query

        await connection.commit(); // Commit the transaction

        return res.status(201).send({ success: true, message: "Category Inserted Successfully", GId: newGId });
    } catch (error) {
        await connection.rollback(); // Rollback on error
        console.log(error);
        return res.status(500).send({ success: false, message: "Error in addGroupController", error: error.message });
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
};

export const addCategory = async (req, res) => {
    try {
        console.log("first")
        console.log(req.body)
        const { category } = req.body;

        const sql = `insert into category (name) values(?)`
        const values = [category]
        db.query(sql, values, (error, result) => {
            if (error) {
                return res.status(500).send({ success: false, message: "Internal server error", error: error.message });
            }
            if (result) {
                return res.status(201).send({ success: true, message: "Category Inserted Successfully", result })
            }
        })
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in addCategoryController", error: error.message });

    }
}
export const addMode = async (req, res) => {
    try {
        // console.log("first")
        // console.log(req.body)
        const { coursemode } = req.body;

        const sql = `insert into mode (coursemode) values(?)`
        const values = [coursemode]
        db.query(sql, values, (error, result) => {
            if (error) {
                return res.status(500).send({ success: false, message: "Internal server error", error: error.message });
            }
            if (result) {
                return res.status(201).send({ success: true, message: "Category Inserted Successfully", result })
            }
        })
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in addCategoryController", error: error.message });

    }
}
