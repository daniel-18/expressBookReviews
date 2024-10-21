const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js").default;
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
  return res.json({ token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  
  const  isbn = req.params.isbn;
  const result = books.filter(book => isbn && book.isbn === isbn);

  const reviews = result.reviews
  reviews.push(req.body.review)

  return res.status(200).json({message: "review added", books: books});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
