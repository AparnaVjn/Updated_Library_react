import express from 'express';

import student from '../schema/student.js';
import book from '../schema/book.js';


const router = express.Router();

router.get('/bookIssue/:admissionNo', async function (req, res) {
    const admissionNo = req.params.admissionNo;
    console.log(admissionNo)

    if (!admissionNo) {
        return res.status(400).send('Student ID is required');
    }
    try {
        const students = await student.findOne({ admissionNo: admissionNo });
        if (!students) {
            return res.json(null);
        }

        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch student details');
    }
});


// Book return

router.get('/returnBook/:serialNo/:admissionNo', async function (req, res) {
    const serialNo = req.params.serialNo;
    const admissionNo = req.params.admissionNo;

    try {
        const books = await book.findOne({ serialNo: serialNo });
        if (!books) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const students = await student.findOne({ admissionNo: admissionNo });
        if (!students) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Find the index of the book to be returned in student's issuedBooks array
        const index = students.issuedBooks.findIndex((issuedBook) => issuedBook.serialNo === serialNo);

        if (index === -1) {
            return res.status(404).json({ error: 'Book not issued to student' });
        }

        // Remove the book from student's issuedBooks array
        students.issuedBooks.splice(index, 1);

        // Save the updated student document
        await students.save();

        // Update book's issueStatus to "No" and remove the admissionNo
        books.issueStatus = "No";
        books.admissionNo = null;
        await books.save();

        res.json({ message: 'Book returned successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to return book');
    }
});


//issueing book

router.get('/bookHeader/:serialNo/:admissionNo', async function (req, res) {
    const serialNo = req.params.serialNo;
    const admissionNo = req.params.admissionNo;

    try {
        const books = await book.findOne({ serialNo: serialNo });
        if (!books) {
            return res.json(null);
        } else {
            const students = await student.findOne({ admissionNo: admissionNo });
            // Check if student exists
            if (!students) {
                return res.status(404).json({ error: 'Student not found' });
            }
            // Check if student.issuedBooks exists, if not, create it
            if (!students.issuedBooks) {
                students.issuedBooks = {};
            }
            const newBook = {
                bookName: books.bookName,
                serialNo: books.serialNo,
                issueDate: new Date() // Use current date and time
            };
            students.issuedBooks.push(newBook);
            await students.save();
            books.issueStatus = "yes";
            books.admissionNo = admissionNo;
            await books.save();
        }
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch book details');
    }
});


// Return Book


router.get('/returnBook/:serialNo/:admissionNo', async function (req, res) {
    const serialNo = req.params.serialNo;
    const admissionNo = req.params.admissionNo;

    try {
        const books = await book.findOne({ serialNo: serialNo });
        if (!books) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const students = await student.findOne({ admissionNo: admissionNo });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Find the index of the book to be returned in student's issuedBooks array
        const index = students.issuedBooks.findIndex((issuedBook) => issuedBook.serialNo === serialNo);

        if (index === -1) {
            return res.status(404).json({ error: 'Book not issued to student' });
        }

        // Remove the book from student's issuedBooks array
        students.issuedBooks.splice(index, 1);

        // Save the updated student document
        await students.save();

        // Update book's issueStatus to "No" and remove the admissionNo
        books.issueStatus = "No";
        books.admissionNo = null;
        await books.save();

        res.json({ message: 'Book returned successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to return book');
    }
});


export default router;