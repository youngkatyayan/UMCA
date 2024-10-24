import { db } from "../../utils/db.js";
import nodemailer from 'nodemailer'
import crypto from "crypto"

export const addGroup = async (req, res) => {
    const connection = await db.getConnection();

    try {

        const { group,gdescription } = req.body;

        await connection.beginTransaction();


        const ssql = `SELECT GId FROM groups ORDER BY GId DESC LIMIT 1`;
        const [result] = await connection.query(ssql);

        let newGId = 1001;
        if (result.length > 0) {
            const GId = result[0].GId;
            const lastGId = parseInt(GId, 10);
            newGId = lastGId + 1; // Increment GId
        }


        const sql = `INSERT INTO groups (GId, groupname, gdescription) VALUES (?, ?, ?)`;
        const values = [newGId, group,gdescription];
        await connection.query(sql, values);

        await connection.commit();

        return res.status(201).send({ success: true, message: "Group Inserted Successfully", GId: newGId });
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(500).send({ success: false, message: "Error in addGroupController", error: error.message });
    } finally {
        if (connection) connection.release();
    }
};

export const addCategory = async (req, res) => {

    const connection = await db.getConnection();
    try {
        console.log(req.body)
        const { category, groupname } = req.body;

        await connection.beginTransaction();


        const ssql = `SELECT Caid FROM category ORDER BY Caid DESC LIMIT 1`;
        const [result] = await connection.query(ssql);

        let newCaid = 4001;
        if (result.length > 0) {
            const Caid = result[0].Caid;
            const lastCeid = parseInt(Caid, 10);
            newCaid = lastCeid + 1; // Increment Caid
        }

        const sql = `insert into category (Caid,categoryname,groupname) values(?,?,?)`
        const values = [newCaid, category, groupname]
        const [insertResult] = await db.query(sql, values)

        if (insertResult.affectedRows > 0) {

            await connection.commit();
            return res.status(201).send({ success: true, message: "Category Inserted Successfully" });
        }
        await connection.rollback();
        return res.status(500).send({ success: false, message: "Failed to insert category" });
    } catch (error) {

        await connection.rollback();
        return res.status(500).send({ success: false, message: "Error in addCategoryController", error: error.message });

    } finally {
        connection.release();
    }
}

export const addMode = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const { coursemode } = req.body;
        await connection.beginTransaction();
        const ssql = `SELECT Cmid FROM mode ORDER BY Cmid DESC LIMIT 1`;
        const [result] = await connection.query(ssql);

        let newCmid = 3001;
        if (result.length > 0) {
            const Cmid = result[0].Cmid;
            const lastCmid = parseInt(Cmid, 10);
            newCmid = lastCmid + 1; // Increment GId
        }

        const sql = `insert into mode (Cmid,coursemode) values(?, ?)`
        const values = [newCmid, coursemode]
        await connection.query(sql, values)

        await connection.commit();

        return res.status(201).send({ success: true, message: "Mode Inserted Successfully" });

    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in addModeyController", error: error.message });

    }
}

export const addSession = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const { additionalfee, categoryname, groupname, mode, session } = req.body;
        const requiredFields = { additionalfee, categoryname, groupname, mode, session }
        for (const [field, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.status(400).send({ success: false, error: `${field} is required` })
            }
        }
        await connection.beginTransaction();

        const ssql = `SELECT SeId FROM session ORDER BY SeId DESC LIMIT 1`;
        const [result] = await connection.query(ssql);

        let newSeId = 6001;
        if (result.length > 0) {
            const SeId = result[0].SeId;
            const lastSeId = parseInt(SeId, 10);
            newSeId = lastSeId + 1; // Increment GId
        }




        const sql = `insert into session (SeId,additionalfee, categoryname, groupname, mode, session) values(?,?,?,?,?,?)`
        const values = [newSeId, additionalfee, categoryname, groupname, mode, session]
        await connection.query(sql, values)


        await connection.commit();
        return res.status(201).send({ success: true, message: "Session Inserted Successfully" });

    } catch (error) {
        await connection.rollback();
        return res.status(500).send({ success: false, message: "Error in addSession", error: error.message });

    } finally {
        if (connection) connection.release();
    }
}

export const addCourse = async (req, res) => {
    const connection = await db.getConnection()

    try {

        const { applicationfee, categoryname, coursemode, coursename, session, description, duration, eligibility, examfee, yearlyfee } = req.body;
        const requiredFields = { applicationfee, categoryname, coursemode, coursename, session, description, duration, eligibility, examfee, yearlyfee }
        for (const [field, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.status(400).send({ success: false, error: `${field} is required` })
            }
        }



        await connection.beginTransaction();

        const ssql = `SELECT CoId FROM course ORDER BY CoId DESC LIMIT 1`;
        const [result] = await connection.query(ssql);

        let newCoId = 2001;
        if (result.length > 0) {
            const CoId = result[0].CoId;
            const lastCoId = parseInt(CoId, 10);
            newCoId = lastCoId + 1; // Increment CoId
        }



        const sql = `insert into course (CoId,applicationfee, categoryname,coursemode,coursename, session, description,duration,eligibility, examfee, yearlyfee) values(?,?,?,?,?,?,?,?,?,?,?)`
        const values = [newCoId, applicationfee, categoryname, coursemode, coursename, session, description, duration, eligibility, examfee, yearlyfee]
        await connection.query(sql, values)


        await connection.commit();

        return res.status(201).send({ success: true, message: "Course Inserted Successfully", result })

    } catch (error) {
        await connection.rollback();

        return res.status(500).send({ success: false, message: "Error in addCourse", error: error.message });

    } finally {
        if (connection) connection.release();
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

export const getMode = async (req, res) => {
    try {

        const sql = `select * from mode `
        const [result] = await db.query(sql)

        if (result) {
            return res.status(201).send({ success: true, message: "Category Inserted Successfully", result });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getMode controller" });

    }
}

export const getCategory = async (req, res) => {
    try {

        const sql = `select * from category `
        const [result] = await db.query(sql)

        if (result) {
            return res.status(201).send({ success: true, message: "Category Inserted Successfully", result });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getCategory controller" });

    }
}

export const getCourse = async (req, res) => {
    try {

        const sql = `select * from course `
        const [result] = await db.query(sql)

        if (result) {
            return res.status(201).send({ success: true, message: "Category Inserted Successfully", result });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getCourse controller" });

    }
}

export const getSession = async (req, res) => {
    try {

        const sql = `select * from session `
        const [result] = await db.query(sql)

        if (result) {
            return res.status(201).send({ success: true, result });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getSession controller" });

    }
}

export const getFranchise = async (req, res) => {

    try {

        const sql = `select * from franchiseactive where status=1`
        const [result] = await db.query(sql)

        if (result) {
            return res.status(201).send({ success: true, result });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getFtanchise controller" });

    }
}

export const getIncomFranchise = async (req, res) => {

    try {

        const sql = `select * from franchiseactive where status=0`
        const [result] = await db.query(sql)

        if (result) {
            return res.status(201).send({ success: true, result });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getFtanchise controller" });

    }
}

export const getCourseDetails = async (req, res) => {
    try {
        console.log(req.params)
        const { CoId } = req.params
        const sql = `select * from course where CoId=? `
        const value = [CoId]
        const [result] = await db.query(sql, value)

        if (result) {
            return res.status(201).send({ success: true, result });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getSession controller" });

    }
}




export const updateCourseStatus = async (req, res) => {
    try {
        const { CoId, costatus } = req.body
        const sql = `update course set  costatus=? where CoId=? `
        const values = [costatus, CoId]
        const [result] = await db.query(sql, values)
        console.log(result)
        if (result) {
            return res.status(201).send({ success: true, result, message: 'Successfully Updated status ' });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in UpdateStatus controller" });

    }
}

export const updateModeStatus = async (req, res) => {

    try {
        const { Cmid, cmstatus } = req.body
        const sql = `update mode set  cmstatus=? where Cmid=? `
        const values = [cmstatus, Cmid]
        const [result] = await db.query(sql, values)
        console.log(result)
        if (result) {
            return res.status(201).send({ success: true, result, message: 'Successfully Updated Mode Status ' });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in UpdateModeStatus controller" });

    }
}

export const updateSessionStatus = async (req, res) => {

    try {
        const { SeId, sestatus } = req.body
        const sql = `update session set  sestatus=? where SeId=? `
        const values = [sestatus, SeId]
        const [result] = await db.query(sql, values)
        console.log(result)
        if (result) {
            return res.status(201).send({ success: true, result, message: 'Successfully Updated Session Status ' });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in UpdateSessionStatus controller" });

    }
}

export const updateGroupStatus = async (req, res) => {


    try {
        const { GId, gstatus } = req.body
        const sql = `update groups set  gstatus=? where GId=? `
        const values = [gstatus, GId]
        const [result] = await db.query(sql, values)
        console.log(result)
        if (result) {
            return res.status(201).send({ success: true, result, message: 'Successfully Updated Group Status ' });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in UpdateGroupStatus controller" });

    }
}







export const updateCourse = async (req, res) => {
    try {
        const { applicationfee, categoryname, coursemode, coursename, session, description, duration, eligibility, examfee, yearlyfee, CoId } = req.body
        const sql = `update course set  applicationfee=?, categoryname=?, coursemode=?, coursename=?, session=?, description=?, duration=?, eligibility=?, examfee=?, yearlyfee=? where CoId=? `
        const values = [applicationfee, categoryname, coursemode, coursename, session, description, duration, eligibility, examfee, yearlyfee, CoId]
        const [result] = await db.query(sql, values)
        console.log(result)
        if (result) {
            return res.status(201).send({ success: true, result, message: 'Successfully Updated Course ' });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in UpdateCourse controller" });

    }
}

export const updateCategory = async (req, res) => {
    try {
        const { description, Caid, groupname, category } = req.body
        const sql = `update category set  description=?, groupname=?, categoryname=? where  Caid=? `
        const values = [description, groupname, category, Caid]
        const [result] = await db.query(sql, values)
        console.log(result)
        if (result) {
            return res.status(201).send({ success: true, result, message: 'Successfully Updated Category ' });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in UpdateCategory controller" });

    }
}

export const updateSesson = async (req, res) => {
    try {
        const { additionalfee, category, SeId, groupname, mode, session } = req.body
        const sql = `update session set  additionalfee=?, groupname=?,mode=?, session=?, categoryname=? where  SeId=? `
        const values = [additionalfee, groupname, mode, session, category, SeId]
        const [result] = await db.query(sql, values)
        console.log(result)
        if (result) {
            return res.status(201).send({ success: true, result, message: 'Successfully Updated Category ' });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in UpdateCategory controller" });

    }
}

export const updateFranchiseStatus = async (req, res) => {


    try {
        const { FId, status } = req.body
        const sql = `update franchiseactive set  status=? where FId=? `
        const values = [status, FId]
        const [result] = await db.query(sql, values)
        console.log(result)
        if (result) {
            return res.status(201).send({ success: true, result, message: 'Successfully Updated Franchise Status ' });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in UpdateFranchise    Status controller" });

    }
}

export const updateIncomFranchiseStatus = async (req, res) => {
    const { cmemail, cmmob, FId, status,cmname } = req.body;
    
    let connection;
    
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const updateFranchiseSql = `UPDATE franchiseactive SET status=? WHERE FId=?`;
        const updateFranchiseValues = [status, FId];
        const [franchiseResult] = await connection.query(updateFranchiseSql, updateFranchiseValues);

        // If franchise status is updated
        if (franchiseResult.affectedRows > 0) {

            const generateRandomCredentials = () => {
                const password = crypto.randomBytes(6).toString('hex');
                return { password };
            };

            const { password } = generateRandomCredentials();

            const userType = "franchise";
            const insertUserSql = `INSERT INTO users (mobile, password,name, email, status, Type) VALUES (?, ?, ?, ?, ?, ?)`;
            const insertUserValues = [cmmob, password,cmname, cmemail, status, userType];
            await connection.query(insertUserSql, insertUserValues);

            await connection.commit();

            const transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user: "kumarsinghdeepak659@gmail.com",
                    pass: "rtmd rzyj aerv ipds",
                },
            });

            const info = await transporter.sendMail({
                from: 'kumarsinghdeepak659@gmail.com', 
                to: cmemail, 
                subject: "Franchise Status Updated", 
                text: `Hello,\n\nYour UMCA franchise request has been approved. Your login credentials are as follows:\nUser ID: ${cmmob}\nPassword: ${password}`, 
                html: `<p>Hello,</p><p>Your UMCA franchise request has been approved. Please log in using the following credentials:<br/></p><p><strong>User ID:</strong> ${cmmob}</p><p><strong>Password:</strong> ${password}</p>`, // html body
            });

            console.log('Email sent:', info.messageId);

            return res.status(200).send({
                success: true,
                message: 'Franchise status updated and notification sent successfully',
            });
        } else {
           
            return res.status(400).send({
                success: false,
                message: 'Franchise ID not found or no change in status',
            });
        }
    } catch (error) {
       
        if (connection) await connection.rollback();
        console.error('Error:', error);
        return res.status(500).send({
            success: false,
            message: 'Error updating franchise status or sending email',
        });
    } finally {
      
        if (connection) connection.release();
    }
};


