const bookModel = require('../models/bookModel');

const addBook = async (req, res) => {
    try {
        const newBook = await bookModel.addBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.getAllBooks();
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateBook = async (req, res) => {
    try {
        const updatedBook = await bookModel.updateBook(req.params.id, req.body);
        if (!updatedBook) return res.status(404).json({ error: "Book not found" });

        res.json(updatedBook);
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const softDeleteBook = async (req, res) => {
    try {
        const deletedBook = await bookModel.softDeleteBook(req.params.id);
        if (!deletedBook) return res.status(404).json({ error: "Book not found" });

        res.json({ message: 'Book deleted (soft delete)', book: deletedBook });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const restoreBook = async (req, res) => {
    try {
        const restoredBook = await bookModel.restoreBook(req.params.id);
        if (!restoredBook) return res.status(404).json({ error: "Book not found or already active" });

        res.json({ message: 'Book restored', book: restoredBook });
    } catch (error) {
        console.error("Error restoring book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    addBook,
    getAllBooks,
    updateBook,
    softDeleteBook,
    restoreBook
};
