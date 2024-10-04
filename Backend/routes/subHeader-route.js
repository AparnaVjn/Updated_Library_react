import express from 'express';
import book from '../schema/book.js';


const router = express.Router();

router.get('/searchBooks', async function(req, res) {
    try {
        const query = req.query.query;
        // Using a case-insensitive regex to search for books by name, author, or serial number
        const books = await book.find({
            $or: [
                { bookName: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } },
                { serialNo: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to search books');
    }
});







export default router;