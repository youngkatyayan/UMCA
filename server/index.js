import express from 'express'
import 'colors'
import dotenv from 'dotenv'
import { db } from './utils/db.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import LoginRouter from './routes/SignInRoutes/LoginRoute.js'
import MasterRoutes from './routes/AdminRoutes/MasterRoutes.js'

import authRouter from './routes/authRoutes/AuthRoute.js'

// database connection start from here
db.connect((err, res) => {
    if (err) {
        console.log((err.message).bgRed.white)
    }
    console.log(`Database connected successfully ${res.connectionId}`.bgYellow.white)
})
// database connection end from here

dotenv.config()

const app = express()


// here all middlewares which is required 
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}))
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())


// routers 
app.get('/', (err, res) => {
    res.send('Hello World !')
})
app.use('/api/v1', LoginRouter)
app.use('/api/v1',MasterRoutes)
app.use('/api/v1', authRouter)





const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`.bgCyan.white)
})