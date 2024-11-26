import { db } from "../../utils/db.js";


export const SeletedCategory = async (req, res) => {

    const { cname } = req.body;
    console.log(req.body)
    const sql = `SELECT * 
        FROM category 
        WHERE groupname = ? 
        
`;
    const values = [cname];

    const [result] = await db.query(sql, values)
        console.log(result)
    if (result.length) {
        return res.status(200).json({ success: true, result, message: 'Courses successfully retrieved' });
    }

};



export const Selctedatcourse = async (req, res) => {

    const { cname } = req.body;
    console.log(req.body)
    const sql = `SELECT * 
        FROM course 
        WHERE categoryname = ? 
        GROUP BY coursename `
    const values = [cname];

    const [result] = await db.query(sql, values)
        console.log(result)
    if (result.length) {
        return res.status(200).json({ success: true, result, message: 'Courses successfully retrieved' });
    }

};

export const SeletedCourse = async (req, res) => {

    const { catname, coursename } = req.body;

    const sql = `SELECT * 
        FROM course 
        WHERE categoryname = ? AND coursename=?
`;
    const values = [catname, coursename];

    const [result] = await db.query(sql, values)

    if (result.length) {
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

export const getTotalcommission = async (req, res) => {
    try {
        const { decryptedMobile } = req.body;
        const sql = `select *  from totalcommission  where franchMobile=? `
        const [result] = await db.query(sql, [decryptedMobile])
        if (result) {
            return res.status(201).send({ success: true, message: "fetched totalcommission Successfully", result });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getTotalStudent controller" });

    }
}

export const franStudentDetails = async (req, res) => {
    try {
        const { decryptedMobile } = req.body;
        const sql = `select *  from franchadmission  where franchMobile=? `
        const [result] = await db.query(sql, [decryptedMobile])
        if (result) {
            return res.status(201).send({ success: true, message: "fetched totalcommission Successfully", result });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getTotalStudent controller" });

    }
}

export const getFranSudent = async (req, res) => {
    console.log(req.body)
    const { SIds } = req.body;
    const sql = 'select * from franchadmission where SId =?';
    const values = [SIds]

    const [result] = await db.query(sql, values)
    if (result) {
        console.log(result)
        return res.status(201).send({ success: true, result, message: "Successfully accessed student data" })
    }

    return res.status(500).send({ success: false, message: "server error", err: err.message })

}



export const Admission = async (req, res) => {
    const { category, Uid, categoryname, groupname, yearlyfee,currentyear, coursename, disabled, district, dob, town,CoId,
        email, gender, line1, line2, minority, mobno, state,
        mothername, name, nationality, perdistrict, perline1, perline2, perpincode,
        perstate, pertown, pincode, relaname, relation, session, whatsappno,
        CommissionRs, educationEntries, commissionper, Admincommission,
        totaladmincommission, totalfranchCommission, } = req.body;


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

        // Insert into franchadmission table
        const sql = `INSERT INTO franchadmission 
                     (SId,CoId, category,franchMobile,commissionern,Admincommission, categoryname,commissionper,groupname,yearlyfee,currentyear, coursename, disabled, district, dob, email,  
                     gender, line1, line2, minority, mobno, mothername, name, 
                     nationality, perdistrict, perline1, perline2, perpincode, perstate,
                     pertown, pincode, relaname, relation, session, state, town, whatsappno) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?,  ?, ?, ?, ?, ? ,? ,?)`;

        const values = [
            newSId,CoId, category, Uid, CommissionRs, Admincommission, categoryname, commissionper, groupname, yearlyfee,currentyear, coursename, disabled, district, dob, email,
            gender, line1, line2, minority, mobno, mothername, name,
            nationality, perdistrict, perline1, perline2, perpincode, perstate,
            pertown, pincode, relaname, relation, session, state, town, whatsappno
        ];

        await connection.query(sql, values);

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


        const sql4 = `Insert into totalcommission (AdminCommission,franchMobile,franchcommission) VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
        AdminCommission=VALUES (AdminCommission) ,
        franchCommission =VALUES(franchcommission)
        `
        const values4 = [totaladmincommission, Uid, totalfranchCommission]

        await connection.query(sql4, values4, (err, result) => {
            if (err) {
                return res.status(500).send({ success: true, message: "Error in updating TotalCommisson", err: err.message })
            }

        })

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

// getUnpaidStudentdataController
export const getUnpaidStudentdataController = async (req, res) => {
    try {
        const { decryptedMobile } = req.body
        const sql = `SELECT fa.*, ct.*, 
       fa.coursename AS cr, 
       fa.CoId AS Cd
FROM franchadmission fa
LEFT JOIN coursetrans ct
ON fa.mobno = ct.mobile 
   AND fa.coursename = ct.coursename
   AND ct.E_Date = (
       SELECT MAX(sub_ct.E_Date)
       FROM coursetrans sub_ct
       WHERE sub_ct.mobile = ct.mobile
   )
WHERE fa.franchMobile = ?;

`
        const [result] = await db.query(sql, [decryptedMobile])
        if (result) {
            return res.status(201).send({ success: true, message: "data access Successfully", result });
        }
    } catch (error) {
        console.error("Transaction error:", error);
        return res.status(500).send({ success: false, message: "Error in getUnpaidStudentdataController" });
    }
}

// getUnpaidStudentdataController
export const offlinePaymentController = async (req, res) => {
    try {
        console.log(req.body)
        const { mobile , courseId, cr,payment, amountpaid,yearlyfee,status} = req.body;

        const sql = `
            INSERT INTO coursetrans (mobile, coursename, payment, courseId,amountpaid,status)
            VALUES (?, ?, ?, ?, ?, ?)
          
        `;

        const [result] = await db.query(sql, [mobile, cr, payment, courseId,amountpaid,status]);

        if (result) {
            return res.status(201).send({ success: true, message: "Successfully updated ", result });
        }
    } catch (error) {
        console.error("Transaction error:", error);
        return res.status(500).send({ success: false, message: "Error in offlinePaymentController" });
    }
};

// get getFranchiseController
export const getFranchiseController = async (req, res) => {
    try {
        const sql = `
            select * from franchiseactive
        `;
        const [result] = await db.query(sql);

        if (result) {
            return res.status(200).send({ success: true, message: "Successfully Access ", result });
        }
    } catch (error) {
        console.error("Transaction error:", error);
        return res.status(500).send({ success: false, message: "Error in getFranchiseController" });
    }
};


// filter filterStudentDataController according to student with including franchise
export const filterStudentDataController = async (req, res) => {
    try {
        const { startDate, endDate, branchName, status } = req.body;

        if (!startDate || !endDate || !branchName || !status) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        const sql = `
            SELECT 
                franchadmission.*, 
                CASE 
                    WHEN coursetrans.mobile IS NULL THEN 'Unpaid'
                    ELSE coursetrans.status
                END AS payment_status,
                coursetrans.status,
                coursetrans.payment
            FROM 
                franchadmission
            LEFT JOIN 
                coursetrans 
            ON 
                franchadmission.mobno = coursetrans.mobile
            WHERE 
                franchadmission.franchMobile = ?
                AND franchadmission.E_Date BETWEEN ? AND ?
                AND (
                    (coursetrans.status = 'Paid' AND ? = 'Paid') 
                    OR (coursetrans.mobile IS NULL AND ? = 'Unpaid')
                )
            GROUP BY 
                franchadmission.mobno;
        `;

        // Execute the query
        const [result] = await db.query(sql, [branchName, startDate, endDate, status, status]);

        // Return the result
        if (result.length > 0) {
            return res.status(200).send({ success: true, message: "Successfully Accessed", result });
        } else {
            return res.status(404).send({ success: false, message: "No data found" });
        }
    } catch (error) {
        console.error("Transaction error:", error);
        return res.status(500).send({ success: false, message: "Error in filterStudentDataController" });
    }
};
