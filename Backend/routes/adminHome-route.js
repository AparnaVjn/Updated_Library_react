import express from 'express';

import book from '../schema/book.js'


const router = express.Router();

router.get('/adminHome', async function(req, res) {
    try {
        const books = await book.find({});
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve books');
    }
});


export default router;