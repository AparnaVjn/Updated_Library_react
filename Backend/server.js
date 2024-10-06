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
import addBookRoute from './routes/addBook-route.js';
import bookDetailsRoute from './routes/bookDetails-route.js';
import bookEditRoute from './routes/editBook-route.js';
import bookIssueRoute from './routes/bookIssue-route.js';
import addStudentRoute from './routes/addStudent-route.js';


dotenv.config();
const app = express();

app.use(cors({
  origin: "https://updated-library-react.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization"], 
}));


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())


app.use('/api',adminLoginRoute);
app.use('/api',headerRoute);
app.use('/api',adminHomeRoute);
app.use('/api',subHeaderRoute);
app.use('/api',addBookRoute);
app.use('/api',bookDetailsRoute);
app.use('/api',bookEditRoute);
app.use('/api',bookIssueRoute);
app.use('/api',addStudentRoute);



mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(3000, () => console.log('Server started on port 3000'));
