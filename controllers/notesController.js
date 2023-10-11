const Note = require('../models/note');

// Create a new note
exports.createNote = async (req, res) => {
    const { title, body } = req.body;

    try {
        const newNote = new Note({ title, body });
        await newNote.save();
        res.json(newNote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all notes
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update a note by ID
exports.updateNote = async (req, res) => {
    const { title, body } = req.body;

    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        note.title = title;
        note.body = body;
        await note.save();
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete a note by ID
exports.deleteNote = async (req, res) => {
    try {
        console.log(req.params.id)
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        await note.deleteOne();
        res.json({ msg: 'Note deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
