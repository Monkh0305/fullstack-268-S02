require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

let books = [
    { id: 1, title: "Book 1", author: "Author 1" },
    { id: 2, title: "Book 2", author: "Author 2" },
    { id: 3, title: "Book 3", author: "Author 3" }
];

// Home
app.get("/", (req, res) => {
    res.send("Hello Books World!");
});

// Get all books
app.get("/books", (req, res) => {
    res.json(books);
});

// Get single book by ID
app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send("Book not found");
    res.json(book);
});

// Create a new book
app.post("/books", (req, res) => {
    if (!req.body.title || !req.body.author) {
        return res.status(400).send("Title and author are required");
    }

    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(book);
    res.status(201).json(book);
});

// Update a book
app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send("Book not found");

    book.title = req.body.title
    book.author = req.body.author

    res.send(book);
});

// Delete a book
app.delete("/books/:id", (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send("Book not found");

    const deleted = books.splice(index, 1);
    res.send(deleted[0]);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
