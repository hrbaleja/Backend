// Import dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/index.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create an express app
const app = express();
const port = process.env.PORT || 5000;

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to the database
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    // Define your routes
    app.use("/api/v1", routes);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Middleware for authenticating requests
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = user;
    next();
  });
};

// Define a protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Define a simple root route
app.get('/', (req, res) => {
  res.send('Hello from the server :)');
});
