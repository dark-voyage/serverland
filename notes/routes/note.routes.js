module.exports = async (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    await app.post('/notes', notes.create);

    // Retrieve all Notes
    await app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    await app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    await app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    await app.delete('/notes/:noteId', notes.delete);
}