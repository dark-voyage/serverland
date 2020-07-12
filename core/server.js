/**
 * @name Server Bootstrap
 * The main server where everything will be initialized
 */

const express = require('express');
const bodyParser = require('body-parser');
const database = require('../database/mongoose.js')

// Create express app
const app = express();

exports.launch = async () => {
    // Parse application/x-www-form-urlencoded
    await app.use(bodyParser.urlencoded({ extended: true }))

// Parse application/json
    await app.use(bodyParser.json())

    await database.initialize()

// Define a simple route
    await app.get('/', (req, res) => {
        res.json({"message": "Welcome to Serverland application. This application belongs to Genemator for serving APIs."});
    });

    await require('../routes/note.routes.js')(app);
    await require('../routes/post.routes.js')(app);

// Listen for requests
    await app.listen(3000, () => {
        console.log("Server is listening on port 3000");
    });
}