const express = require('express');
const bodyParser = require('body-parser');
const database = require('../database/mongoose.js')

// create express app
const app = express();

exports.launch = async () => {
    // parse application/x-www-form-urlencoded
    await app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
    await app.use(bodyParser.json())

    await database.initialize()

// define a simple route
    await app.get('/', (req, res) => {
        res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
    });

    await require('../routes/note.routes.js')(app);
    await require('../routes/post.routes.js')(app);

// listen for requests
    await app.listen(3000, () => {
        console.log("Server is listening on port 3000");
    });
}