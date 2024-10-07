import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import admin from '../schema/admin.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async function(req, res) {
    const { email, password } = req.body;
    console.log('email,password',email,password)
    try {
        const loggedInAdmin = await admin.findOne({ loggedIn: true });
        if (loggedInAdmin) {
            return res.status(401).json({ success: false, error: 'Another admin is already logged in' });
        }
  
        const user = await admin.findOne({ email: email });
        console.log('user:',user)
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        
        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return res.status(401).json({ success: false, error: 'Incorrect password' });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
          res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000
          });
        // const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
        user.loggedIn = true; // Set loggedIn flag\
        console.log('after user:',user);
        console.log('token :',token)
        await user.save();
        
        // res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.json({ user, success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred during the login process');
    }
});

export default router;
