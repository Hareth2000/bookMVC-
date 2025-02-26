const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post('/books', bookController.addBook);
router.get('/books', bookController.getAllBooks);
router.put('/books/:id', bookController.updateBook);
router.put('/books/delete/:id', bookController.softDeleteBook);
router.put('/books/restore/:id', bookController.restoreBook);

module.exports = router;
