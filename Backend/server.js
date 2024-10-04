import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import adminLoginRoute from './routes/adminlogin-route.js';
import headerRoute from './routes/header-routes.js';
import adminHomeRoute from './routes/adminHome-route.js';
import subHeaderRoute from './routes/subHeader-route.js';


dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"],
    credentials: true
}));


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())


app.use('/api',adminLoginRoute);
app.use('/api',headerRoute);
app.use('/api',adminHomeRoute);
app.use('/api',subHeaderRoute);



mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(3000, () => console.log('Server started on port 3000'));