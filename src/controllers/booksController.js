const fs = require("fs");
const path = require("path");
const booksFilePath = path.join(__dirname, "..", "data", "books.json");

// helper function to read books from file
const getBooksFromFile = () => {
    const booksData = fs.readFileSync(booksFilePath);
    return JSON.parse(booksData);
};

// GET /books
const getAll = (req, res) => {
    const books = getBooksFromFile();
    res.status(200).json(books);
};

// GET /books/:id
const getById = (req, res) => {
    const books = getBooksFromFile();
    const book = books.find((book) => book.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
};

// POST /books
const create = (req, res) => {
    const books = getBooksFromFile();
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        published: req.body.published,
    };
    books.push(newBook);
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
    res.status(201).json(newBook);
};

// PUT /books/:id
const updateById = (req, res) => {
    const books = getBooksFromFile();
    const bookIndex = books.findIndex(
        (book) => book.id === parseInt(req.params.id)
    );
    if (bookIndex !== -1) {
        books[bookIndex] = {
            id: parseInt(req.params.id),
            title: req.body.title,
            author: req.body.author,
            published: req.body.published,
        };
        fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
        res.status(200).json(books[bookIndex]);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
};

// DELETE /books/:id
const deleteById = (req, res) => {
    const books = getBooksFromFile();
    const bookIndex = books.findIndex(
        (book) => book.id === parseInt(req.params.id)
    );
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
        res.status(200).json({ message: "Book deleted" });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
};

module.exports = { getAll, getById, create, updateById, deleteById };