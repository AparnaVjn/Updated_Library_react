import express from 'express';

import student from '../schema/student.js';


const router = express.Router();

router.post('/addStudent', async function(req, res) {
    if (!req.body.studentName || !req.body.className || !req.body.division || !req.body.admissionNo || !req.body.gender) {
        return res.status(400).send('All fields are required');
    }
    var studentData = new student({
        studentName: req.body.studentName,
        className: req.body.className,
        division: req.body.division,
        admissionNo: req.body.admissionNo,
        gender: req.body.gender
    });
    try {
        await studentData.save();
        res.json();
    } catch (err) {
        // Handle any errors that occur during the save operation
        console.error(err);
        res.status(500).send('Failed to add student');
    }
});



export default router;