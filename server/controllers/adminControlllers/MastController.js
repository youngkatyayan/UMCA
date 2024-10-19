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
    try {
        console.log("first")
        console.log(req.body)
        const { category,groupname } = req.body;

        const sql = `insert into category (categoryname,groupname) values(?,?)`
        const values = [category,groupname]
        const [result]=await db.query(sql, values)

        if(result){


            return res.status(201).send({ success: true, message: "Category Inserted Successfully" });
        }

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
        return res.status(500).send({ success: false, message: "Error in addModeyController", error: error.message });

    }
}

export const addSession = async (req, res) => {
    try {
        console.log(req.body)
        const {additionalfee, categoryname, groupname, mode, session } = req.body;
        const requiredFields={additionalfee, categoryname, groupname, mode, session }
        for(const[field,value] of Object.entries(requiredFields)){
            if(!value){
                return res.status(400).send({success: false,error: `${field} is required`})
            }
        }

        const sql = `insert into session (additionalfee, categoryname, groupname, mode, session) values(?,?,?,?,?)`
        const values = [additionalfee, categoryname, groupname, mode, session]
        const [result] =await db.query(sql, values)

        if (result) {
            return res.status(201).send({ success: true, message: "Category Inserted Successfully", result })
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in addSession", error: error.message });

    }
}

export const addCourse = async (req, res) => {
    try {
        console.log(req.body)
        const {applicationfee, categoryname,coursemode,coursename, description,duration,eligibility, examfee, yearlyfee} = req.body;
        const requiredFields={applicationfee, categoryname,coursemode,coursename, description,duration,eligibility, examfee, yearlyfee}
        for(const[field,value] of Object.entries(requiredFields)){
            if(!value){
                return res.status(400).send({success: false,error: `${field} is required`})
            }
        }

        const sql = `insert into course (applicationfee, categoryname,coursemode,coursename, description,duration,eligibility, examfee, yearlyfee) values(?,?,?,?,?,?,?,?,?)`
        const values = [applicationfee,categoryname,coursemode,coursename, description,duration,eligibility, examfee, yearlyfee]
        const [result] =await db.query(sql, values)

        if (result) {
            return res.status(201).send({ success: true, message: "Course Inserted Successfully", result })
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in addCourse", error: error.message });

    }
}


export const getGroup =async (req,res)=>{
    
    try {
        const sql = `select * from groups `
        const [result] = await db.query(sql)

        return res.status(201).send({ success: true, message: "Category Inserted Successfully", result });
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getGroup controller" });

    }
}

export const getMode =async (req,res)=>{
    
    try {
        
        const sql=`select * from mode `
        const [result]=await db.query(sql)

      if(result){
        return res.status(201).send({ success: true, message: "Category Inserted Successfully",result });
      }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getMode controller" });
       
    }
}

export const getCategory =async (req,res)=>{
    
    try {
        
        const sql=`select * from category `
        const [result]=await db.query(sql)

      if(result){
        return res.status(201).send({ success: true, message: "Category Inserted Successfully",result });
      }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getCategory controller" });
       
    }
}

export const getCourse =async (req,res)=>{
    
    try {
        
        const sql=`select * from course `
        const [result]=await db.query(sql)

      if(result){
        return res.status(201).send({ success: true, message: "Category Inserted Successfully",result });
      }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in getCategory controller" });
       
    }
}