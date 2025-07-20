const express = require('express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../model/User.js');
const regd_users = express.Router();

dotenv.config();

const isValid = async (username) => { //returns boolean
  //write code to check is the username is valid
  return await User.findOne({ where: { username } })
    .then(user =>
      user == null ? true : false)
    .catch(err => {
      console.error("Error occurred while validating user:", err);
      return false;
    });
}

const authenticatedUser = async (username, password) => {
  //write code to check if username and password match the one we have in records.
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return false;
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  console.log("Password validation result:", isValidPassword);
  if (!isValidPassword) {
    return false;
  }
  return true;
}

//only registered users can login
regd_users.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  const isAuthenticated = await authenticatedUser(username, password);
  console.log("Authentication attempt for username:", username, "Result:", isAuthenticated);
  if (!isAuthenticated) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
  return res.status(200).json({ token });
});

// Register a new user
regd_users.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  const isUsernameValid = await isValid(username);
  console.log("Registration attempt for username:", isUsernameValid);

  if (!isValid(username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    console.log("New user created:", newUser);
    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error occurred during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.authenticated = regd_users;
