const express = require('express');
const public_books = express.Router();
const Book = require('../model/Book.js');
const authenticateToken = require("../middleware/authMiddleware.js").authenticateToken;


public_books.post("/register", (req,res) => {
  //Write your code here
  const { title, author, reviews } = req.body;
  if (!title || !author || !reviews) {
    return res.status(400).json({ message: "All fields are required" });
  }
  Book.create({ title, author, reviews })
    .then(book => {
      return res.status(201).json(book);
    })
    .catch(err => {
      console.error("Error occurred while registering book:", err);
      return res.status(500).json({ message: "Internal server error" });
    });
});

// Update book details based on id
public_books.put('/update/:id', function (req, res) {
  const bookId = req.params.id;

  const bookData = Book.findByPk(bookId);
  
  if (!bookData) {
    return res.status(404).json({ message: "Book not found" });
  }

  Book.update(req.body, { where: { id: bookId } })
    .then(([updatedCount]) => {
      if (updatedCount === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book updated successfully" });
    })
    .catch(err => {
      console.error("Error updating book:", err);
      return res.status(500).json({ message: "Internal server error" });
    });
}); 

// delete a book based on id
public_books.delete('/delete/:id', function (req, res) {
  const bookId = req.params.id;
  Book.destroy({ where: { id: bookId } })
    .then(deletedCount => {
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book deleted successfully" });
    })
    .catch(err => {
      console.error("Error deleting book:", err);
      return res.status(500).json({ message: "Internal server error" });
    });
});


// Get the book list available in the shop
public_books.get('/', function (req, res) {
  //Write your code here
  Book.findAll()
    .then(books => {
      return res.status(200).json(books);
    })
    .catch(err => {
      console.error("Error fetching book list:", err);
      return res.status(500).json({ message: "Internal server error" });
    });
});

// Get book details based on id
public_books.get('/id/:id', function (req, res) {
  const bookId = req.params.id;
  Book.findByPk(bookId)
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(book);
    })
    .catch(err => {
      console.error("Error fetching book details:", err);
      return res.status(500).json({ message: "Internal server error" });
    });
});

// Get book details based on author
public_books.get('/author', function (req, res) {
  const authorName = req.body.author;
  if (!authorName) {
    return res.status(400).json({ message: "Author name is required in the request body" });
  }
  Book.findAll({ where: { author: authorName } })
    .then(books => {
      if (books.length === 0) {
        return res.status(404).json({ message: "No books found for this author" });
      }
      return res.status(200).json(books);
    })
    .catch(err => {
      console.error("Error fetching books by author:", err);
      return res.status(500).json({ message: "Internal server error" });
    });
});

// Get all books based on title
public_books.get('/title', function (req, res) {
  const title = req.body.title;
  if (!title) {
    return res.status(400).json({ message: "Title is required in the request body" });
  }
  Book.findAll({ where: { title } })
    .then(books => {
      if (books.length === 0) {
        return res.status(404).json({ message: "No books found with this title" });
      }
      return res.status(200).json(books);
    })
    .catch(err => {
      console.error("Error fetching books by title:", err);
      return res.status(500).json({ message: "Internal server error" });
    });
});

//  Get book review
public_books.get('/review/:id', function (req, res) {
  const bookId = req.params.id;
  Book.findByPk(bookId)
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(book.reviews);
    })
    .catch(err => {
      console.error("Error fetching book reviews:", err);
      return res.status(500).json({ message: "Internal server error" });
    }); 
});

module.exports.general = public_books;
