const pool = require('../config/db');

const addBook = async (book) => {
    const { title, author, genre, publication_date, description } = book;
    const result = await pool.query(
        'INSERT INTO books (title, author, genre, publication_date, description, is_deleted) VALUES ($1, $2, $3, $4, $5, FALSE) RETURNING *',
        [title, author, genre, publication_date, description]
    );
    return result.rows[0];
};

const getAllBooks = async () => {
    const result = await pool.query('SELECT * FROM books WHERE is_deleted IS FALSE');
    return result.rows;
};

const updateBook = async (id, book) => {
    const { title, author, genre, publication_date, description } = book;
    const result = await pool.query(
        'UPDATE books SET title=$1, author=$2, genre=$3, publication_date=$4, description=$5 WHERE id=$6 RETURNING *',
        [title, author, genre, publication_date, description, id]
    );
    return result.rowCount > 0 ? result.rows[0] : null;
};

const softDeleteBook = async (id) => {
    const result = await pool.query(
        'UPDATE books SET is_deleted = TRUE WHERE id=$1 RETURNING *', [id]
    );
    return result.rowCount > 0 ? result.rows[0] : null;
};

const restoreBook = async (id) => {
    const result = await pool.query(
        'UPDATE books SET is_deleted = FALSE WHERE id=$1 RETURNING *', [id]
    );
    return result.rowCount > 0 ? result.rows[0] : null;
};

module.exports = {
    addBook,
    getAllBooks,
    updateBook,
    softDeleteBook,
    restoreBook
};
