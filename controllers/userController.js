// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, });
    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User login
exports.logins = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    // Create a JSON Web Token (JWT)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY, // Replace with your secret key
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user information
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, password } = req.body;
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the updated email already exists for another user
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use by another user' });
      }
    }
    // Update user data
    user.name = name || user.name;
    user.email = email || user.email;

    // If a new password is provided, hash and update it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user data
    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete user account
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Delete the user
    await user.deleteOne();
    res.json({ msg: 'user deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

