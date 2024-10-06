import express from 'express';
import book from '../schema/book.js';


const router = express.Router();

router.get('/bookDetails/:id', async function(req, res) {
    try {
        const bookId = req.params.id;
        const books = await book.findById(bookId);
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve book details');
    }
});

router.post('/deleteBook/:id', function(req, res) {
    const bookId = req.params.id;
    book.deleteOne({ _id: bookId })
      
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });



export default router;