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

// get entroll user data by getStudentProceedDataController
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

// update user profile by updateUserProfileController
export const updateUserProfileController = async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const files = req.file ? req.file.filename : null;
        const {
            minority, name, dob, gender, category, relation, relaname, mothername, nationality, disabled, line1, line2, town, state, district, pincode, perline1,
            perline2, pertown, perstate, perdistrict, perpincode, Uid, mobno, email, sameAsAbove, whatsappno, educationEntries
        } = req.body;

        // console.log(req.body);

        const fields = { minority, name, dob, gender, category, relation, relaname, mothername, nationality, disabled, line1, line2, town, state, district, pincode, perline1, perline2, pertown, perstate, perdistrict, perpincode, Uid, mobno, email, sameAsAbove, whatsappno };
        for (const [key, value] of Object.entries(fields)) {
            if (!value) {
                return res.status(404).send({ error: `${key} is required` });
            }
        }
        // Check required fields in education entries
        educationEntries.forEach((entry, index) => {
            for (const [key, value] of Object.entries(entry)) {
                if (!value) {
                    return res.status(404).send({ error: `${key} in education entry ${index + 1} is required` });
                }
            }
        });

        await connection.beginTransaction();

        const sqll = `SELECT SId FROM franchadmission ORDER BY SId DESC LIMIT 1`;
        const [latestIdResult] = await connection.query(sqll);
        const newSId = latestIdResult.length > 0 ? parseInt(latestIdResult[0].SId, 10) + 1 : 81000;

        const sql = 'SELECT * FROM franchadmission WHERE mobno = ?';
        const [existingUser] = await connection.query(sql, [mobno]);

        if (existingUser.length > 0) {
            const updSql = `UPDATE franchadmission SET category=?, disabled=?, district=?, dob=?, email=?, gender=?, line1=?, minority=?,
             mobno=?, mothername=?, name=?, nationality=?, perdistrict=?, perline1=?, perline2=?, perpincode=?, perstate=?, pertown=?, pincode=?, relaname=?, relation=?, state=?, town=?, whatsappno=? WHERE mobno=?`;
            const updResult = [category, disabled, district, dob, email, gender, line1, minority, mobno, mothername, name, nationality,
                perdistrict, perline1, perline2, perpincode, perstate, pertown, pincode, relaname, relation, state, town, whatsappno, mobno];

            const [updateResult] = await connection.query(updSql, updResult);
            if (updateResult.affectedRows === 0) {
                throw new Error("Failed to update profile");
            }

        } else {
            const insSql = `INSERT INTO franchadmission (SId, franchMobile, category, disabled, district, dob, email, gender, line1, minority, mobno, mothername, name, nationality, perdistrict, perline1, perline2, perpincode, perstate, pertown, pincode, relaname, relation,
             state, town, whatsappno,profileImg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            const insResult = [newSId, Uid, category, disabled, district, dob, email, gender, line1, minority, mobno, mothername, name, nationality, perdistrict, perline1, perline2, perpincode, perstate, pertown, pincode, relaname, relation, state, town, whatsappno,files];

            const [insertResult] = await connection.query(insSql, insResult);
            if (insertResult.affectedRows === 0) {
                throw new Error("Failed to insert profile");
            }
        }

        // Handle education entries
        for (const entry of educationEntries) {
            const checkSql = `SELECT * FROM frachadedu WHERE FEId = ? AND examinationPassed = ?`;
            const [existingRecords] = await connection.query(checkSql, [newSId, entry.examinationPassed]);

            if (existingRecords.length > 0) {
                const updateSql = `UPDATE frachadedu SET schoolCollege = ?, boardUniversity = ?, yearOfPassing = ?, marksPercentage = ?, classDivision = ?, subjects = ? WHERE FEId = ? AND examinationPassed = ?`;
                const updateResult = [entry.schoolCollege || null, entry.boardUniversity || null, entry.yearOfPassing ||
                    null, entry.marksPercentage || null, entry.classDivision || null, entry.subjects || null, newSId, entry.examinationPassed];
                await connection.query(updateSql, updateResult);

            } else {
                const insertSql = `INSERT INTO frachadedu (FEId, examinationPassed, schoolCollege, boardUniversity, yearOfPassing, marksPercentage, classDivision, subjects) VALUES (?,?,?,?,?,?,?,?)`;
                const insertResult = [newSId, entry.examinationPassed || null, entry.schoolCollege ||
                    null, entry.boardUniversity || null, entry.yearOfPassing || null, entry.marksPercentage ||
                    null, entry.classDivision || null, entry.subjects || null];
                await connection.query(insertSql, insertResult);
            }
        }

        await connection.commit();
        return res.status(201).send({ success: true, message: existingUser.length > 0 ? 'Profile Updated' : 'Profile and Education Entries Inserted' });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Error in updateUserProfileController:", error.message);
        return res.status(500).send({ success: false, message: "Error in updateUserProfileController" });

    } finally {
        if (connection) connection.release();
    }
};

// entroll course controller
export const ectrollCourseController = async (req, res) => {
    try {
        const { mobile } = req.body
        if (!mobile) {
            return res.status(404).send({ error: 'mobile is required' })
        }
        const sql = `select * from franchadmission 
left join ordertable on franchadmission.mobno=ordertable.phone 
left join course on ordertable.courseId=course.CoId
left join category on  ordertable.categoryId=category.Caid
where mobno=? GROUP BY COALESCE(ordertable.course, franchadmission.coursename)`
        const [result] = await db.query(sql, [mobile])
        if (result.length > 0) {
            return res.status(200).send({ success: true, message: "data access successfully", result });
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ success: false, message: "Error in ectrollCourseController" });
    }
}
