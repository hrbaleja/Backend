// Load env variables
// if (process.env.NODE_ENV != "production") {
// }
require("dotenv").config();

// Import dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to database
connectToDb();

// Routes
app.get('/', (req, res) => {
  res.send('hello from simple server :)')
})
app.use('/api/notes', require('./routes/noteRoute'));
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/categories', require('./routes/categoryRoutes'));


// Start our server
app.listen(process.env.PORT);