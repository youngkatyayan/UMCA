import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config()

export const db = mysql2.createPool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,

})