import { db } from "../../utils/db.js";


export const addCategory=async(req,res)=>{
    try {
        console.log("first")
        console.log(req.body)
        const{category}=req.body;

        const sql=`insert into category (name) values(?)`
        const values=[category]
        db.query(sql,values,(error,result)=>{
            if(error){
                return res.status(500).send({success: false, message: "Internal server error",error: error.message});
            }
            if(result){
                return res.status(201).send({success:true,message:"Category Inserted Successfully",result})
            }
        })
    } catch (error) {
        return res.status(500).send({success: false, message: "Error in addCategoryController",error: error.message});
        
    }
}
export const addMode=async(req,res)=>{
    try {
        console.log("first")
        console.log(req.body)
        const{coursemode}=req.body;

        const sql=`insert into mode (coursemode) values(?)`
        const values=[coursemode]
        db.query(sql,values,(error,result)=>{
            if(error){
                return res.status(500).send({success: false, message: "Internal server error",error: error.message});
            }
            if(result){
                return res.status(201).send({success:true,message:"Category Inserted Successfully",result})
            }
        })
    } catch (error) {
        return res.status(500).send({success: false, message: "Error in addCategoryController",error: error.message});
        
    }
}