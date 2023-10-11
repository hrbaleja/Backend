const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// Create a new note
router.post('/', notesController.createNote);

// Get all notes
router.get('/', notesController.getAllNotes);

// Get a single note by ID
router.get('/:id', notesController.getNoteById);

// Update a note by ID
router.put('/:id', notesController.updateNote);

// Delete a note by ID
router.delete('/:id', notesController.deleteNote);

module.exports = router;
