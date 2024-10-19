import { db } from "../../utils/db.js";

export const addGroup = async (req, res) => {
    const connection = await db.getConnection();

    try {
        console.log(req.body);
        const { group } = req.body;

        await connection.beginTransaction();


        const ssql = `SELECT GId FROM groups ORDER BY GId DESC LIMIT 1`;
        const [result] = await connection.query(ssql);

        let newGId = 1001;
        if (result.length > 0) {
            const GId = result[0].GId;
            const lastGId = parseInt(GId, 10);
            newGId = lastGId + 1; // Increment GId
        }


        const sql = `INSERT INTO groups (GId, groupname) VALUES (?, ?)`;
        const values = [newGId, group];
        await connection.query(sql, values);

        await connection.commit();

        return res.status(201).send({ success: true, message: "Category Inserted Successfully", GId: newGId });
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(500).send({ success: false, message: "Error in addGroupController", error: error.message });
    } finally {
        if (connection) connection.release();
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
        const { coursemode } = req.body;

        const sql = `insert into mode (coursemode) values(?)`
        const values = [coursemode]
        const [result] = await db.query(sql, values)

        if (result) {
            return res.status(201).send({ success: true, message: "Category Inserted Successfully", result })
        }

    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in addCategoryController", error: error.message });

    }
}

export const getGroup = async (req, res) => {
    try {
        const sql = `select * from groups `
        const [result] = await db.query(sql)

        return res.status(201).send({ success: true, message: "Category Inserted Successfully", result });
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getGroup controller" });

    }
}