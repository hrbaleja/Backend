// routes/userRoute.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// User Update
router.put('/:userId', userController.updateUser);

//Delete User
router.delete('/:userId', userController.deleteUser);

module.exports = router;
