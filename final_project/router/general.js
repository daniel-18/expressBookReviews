const express = require('express');
let books = require("./booksdb.js").default;
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  
  return res.status(201).json({ message: 'User registered' });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const  isbn = req.params.isbn;
  const results = books.filter(book => isbn && book.isbn === isbn);

  return res.status(200).json(results);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;

  const results = books.filter(book => author && book.author.toLowerCase().includes(author.toLowerCase()));
  return res.status(200).json(results);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title  = req.params.title;
  const results = books.filter(book => title && book.title.toLowerCase().includes(title.toLowerCase()));
  return res.status(200).json(results);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const results = books.filter(book =>isbn && book.isbn === isbn);
  const reviews = results[0].reviews
  
  return res.status(200).json(reviews);
});

module.exports.general = public_users;
