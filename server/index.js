// server.js
import express from 'express';
import 'colors';
import dotenv from 'dotenv';
import { db } from './utils/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import LoginRouter from './routes/SignInRoutes/LoginRoute.js';
import MasterRoutes from './routes/AdminRoutes/MastRoutes.js';
import authRouter from './routes/authRoutes/AuthRoute.js';
import userRouter from './routes/userRoutes/userRoute.js'
import FranchiseRoutes from './routes/franchiseRoutes/FranchiseRoutes.js'
dotenv.config();

(async () => { 
    try {
        const connection = await db.getConnection();
        console.log('Database connected successfully!'.bgYellow.white);
        connection.release(); 
    } catch (error) {
        console.error('Database connection failed:', error.message.red);
    }
})();

const app = express();

// Middleware 
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Routers
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1', LoginRouter);
app.use('/api/v1', MasterRoutes);
app.use('/api/v1', authRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1/',FranchiseRoutes)

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`.bgCyan.white);
});
