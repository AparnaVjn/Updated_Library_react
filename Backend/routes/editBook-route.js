import express from 'express';
import book from '../schema/book.js';


const router = express.Router();

router.get('/editBook/:id', async function(req, res) {
    try {
        const bookId = req.params.id;
        const books = await book.findById(bookId);
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve book details');
    }
});

router.post('/editBook/:id', async function(req, res) {
    try {
        if (!req.body.bookName || !req.body.author || !req.body.language || !req.body.serialNo) {
            return res.status(400).send('All fields are required');
        }
        const bookId = req.params.id;
        const books = await book.findById(bookId);
        if (!books) {
            return res.status(404).send('Book not found');
        }
        books.bookName = req.body.bookName;
        books.author = req.body.author;
        books.language = req.body.language;
        books.serialNo = req.body.serialNo;
        await books.save();
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to update book');
    }
});



export default router;