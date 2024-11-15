import { db } from "../../utils/db.js";


export const SeletedCategory = async (req, res) => {

    const { cname } = req.body;
    console.log('Category name:', cname);

    const sql = `SELECT * 
        FROM course 
        WHERE categoryname = ? 
        GROUP BY coursename;
`;
    const values = [cname];

    const [result] = await db.query(sql, values)

    if (result.length) {
        console.log('Query successful:', result);
        return res.status(200).json({ success: true, result, message: 'Courses successfully retrieved' });
    }

};

export const SeletedCourse = async (req, res) => {

    const { catname,coursename } = req.body;

    const sql = `SELECT * 
        FROM course 
        WHERE categoryname = ? AND coursename=?
`;
    const values = [catname,coursename];

    const [result] = await db.query(sql, values)

    if (result.length) {
        console.log('Query successful:', result);
        return res.status(200).json({ success: true, result, message: 'Courses successfully retrieved' });
    }

};

export const getState = async (req, res) => {
    try {

        const sql = `select * from statelist `
        const [result] = await db.query(sql)

        if (result) {
            return res.status(201).send({ success: true, message: "fetched state Successfully", result });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getState controller" });

    }
}
export const getDistrict = async (req, res) => {
    try {

        const sql = `select * from districts `
        const [result] = await db.query(sql)

        if (result) {
            return res.status(201).send({ success: true, message: "fetched district Successfully", result });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getDistrict controller" });

    }
}

export const getPartCommission = async (req, res) => {
    try {
        console.log("dfas",req.body)
        const { decryptedMobile } = req.body;
        const sql = `select * from franchadmission  where franchMobile=? `
        const [result] = await db.query(sql, [decryptedMobile])
        if (result) {
            return res.status(201).send({ success: true, message: "fetched commission Successfully", result });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getTotalStudent controller" });

    }
}

export const getTotalStudent = async (req, res) => {
    try {
        console.log(req.body)
        const { decryptedMobile } = req.body;
        const sql = `select count(SId) AS count from franchadmission  where franchMobile=? `
        const [result] = await db.query(sql, [decryptedMobile])
        if (result) {
            return res.status(201).send({ success: true, message: "fetched district Successfully", result });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getTotalStudent controller" });

    }
}



export const Admission = async (req, res) => {
    const { category, Uid, categoryname,groupname,yearlyfee	, coursename, disabled, district, dob, town,
        email, gender, line1, line2, minority, mobno, state,
        mothername, name, nationality, perdistrict, perline1, perline2, perpincode,
        perstate, pertown, pincode, relaname, relation, session, whatsappno,CommissionRs, educationEntries } = req.body;

    console.log(educationEntries);

    // Get the database connection
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // Fetch the latest SId
        const sqll = `SELECT SId FROM franchadmission ORDER BY SId DESC LIMIT 1`;
        const [result] = await connection.query(sqll);

        let newSId = 81000;
        if (result.length > 0) {
            const lastSId = parseInt(result[0].SId, 10);
            newSId = lastSId + 1;
        }
        console.log("New SId:", newSId);

        // Insert into franchadmission table
        const sql = `INSERT INTO franchadmission 
                     (SId, category,franchMobile,commissionern, categoryname,groupname,yearlyfee, coursename, disabled, district, dob, email,  
                     gender, line1, line2, minority, mobno, mothername, name, 
                     nationality, perdistrict, perline1, perline2, perpincode, perstate,
                     pertown, pincode, relaname, relation, session, state, town, whatsappno) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?,?,?)`;

        const values = [
            newSId, category, Uid,CommissionRs, categoryname,groupname,yearlyfee, coursename, disabled, district, dob, email,
            gender, line1, line2, minority, mobno, mothername, name,
            nationality, perdistrict, perline1, perline2, perpincode, perstate,
            pertown, pincode, relaname, relation, session, state, town, whatsappno
        ];

        await connection.query(sql, values);
        console.log("Main admission data inserted");

        // Insert education entries
        const sql3 = `INSERT INTO frachadedu 
                     (FEId, examinationPassed, schoolCollege, boardUniversity, yearOfPassing, 
                     marksPercentage, classDivision, subjects) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        for (const entry of educationEntries) {
            const values3 = [
                newSId, entry.examinationPassed, entry.schoolCollege, entry.boardUniversity,
                entry.yearOfPassing, entry.marksPercentage, entry.classDivision, entry.subjects
            ];
            await connection.query(sql3, values3);
        }
        console.log("Education entries inserted");

        // Commit transaction
        await connection.commit();
        return res.status(201).send({ success: true, message: "Admission Form Submitted" });

    } catch (error) {
        console.error("Transaction error:", error);
        await connection.rollback();
        return res.status(500).send({ success: false, message: "Error in Admission Controller" });
    } finally {
        connection.release(); // Release the connection back to the pool
    }
};
