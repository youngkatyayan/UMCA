import { db } from "../../utils/db.js";


export const SeletedCourse = async (req, res) => {

    const { cname } = req.body;
    console.log('Category name:', cname);

    const sql = `SELECT * FROM course WHERE categoryname = ?`;
    const values = [cname];

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

export const Admission = async (req, res) => {
    const { category, categoryname, coursename, disabled, district, dob, town,
        email, gender, line1, line2, minority, mobno, state,
        mothername, name, nationality, perdistrict, perline1, perline2, perpincode,  //7
        perstate, pertown, pincode, relaname, relation, session, whatsappno, educationEntries } = req.body;


    console.log(educationEntries)


    const connection = db.getConnection()
    try {

        (await connection).beginTransaction()

        console.log('first')
        const sqll = `SELECT SId FROM franchadmission ORDER BY SId DESC LIMIT 1`;
        const result = (await connection).query(sqll)

        let newSId = 41000
        if (result.length > 0) {
            const lastSId = parseInt(result[0].SId, 10)
            newSId = lastSId + 1;
        }
        console.log(newSId)
        const sql = `INSERT INTO franchadmission (SId,category, categoryname, coursename, disabled, district, dob, email,  
         gender, line1, line2, minority, mobno, mothername, name, 
          nationality, perdistrict, perline1, perline2, perpincode, perstate,
           pertown, pincode, relaname, relation,  session, state, town,  whatsappno ) 
           VALUES (?,?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?,?,  ?,?,?,?,?,?,?,?,?)`
        //29
        const values = [
            newSId, category, categoryname, coursename, disabled, district, dob, town,
            email, gender, line1, line2, minority, mobno, state,
            mothername, name, nationality, perdistrict, perline1, perline2, perpincode,
            perstate, pertown, pincode, relaname, relation, session, whatsappno
        ];

        (await connection).query(sql, values)
        console.log("second")


        const sql3 = `INSERT INTO frachadedu (FEId ,examinationPassed,schoolCollege,boardUniversity,yearOfPassing,
        marksPercentage,classDivision,subjects)  VALUES( ?,?,?,?,?,?,?,?)`

        try {
            for (const entry of educationEntries) {
                const values3 = [
                    newSId, entry.examinationPassed, entry.schoolCollege, entry.boardUniversity,
                    entry.yearOfPassing, entry.marksPercentage, entry.classDivision, entry.subjects
                ];
                (await connection).query(sql3, values3)
            }
        } catch (error) {
            console.error('Error inserting education entries:', error);
            await connection.rollback();
            throw error;
        }

        (await connection).commit();

        return res.status(201).send({ success: true, message: "Admission Form Submitted" })

    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: "Error in AdmissionColler " })
    }

}