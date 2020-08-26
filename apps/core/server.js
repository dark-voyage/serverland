/**
 * @name Server Bootstrap
 * The main server where everything will be initialized
 */

const express = require('express');
const ssl = require('heroku-ssl-redirect')
const bodyParser = require('body-parser')
const database = require('../database/mongoose')
const dbConfig = require('../config/server.config')

// Create express app
const app = express();

exports.launch = async () => {

    // Only https
    app.use(ssl())

    // Parse apps/x-www-form-urlencoded
    await app.use(bodyParser.urlencoded({ extended: true }))

    // Parse apps/json
    await app.use(bodyParser.json())

    await database.initialize()

    // Define a simple route
    await app.get('/', (req, res) => {
        res.json({"message": "Welcome to Serverland apps. This apps belongs to Genemator for serving APIs."});
    });

    // Connected routes
    await require('../../posts/routes.js')(app);

    // Listen for requests
    const startup = await app.listen(dbConfig(), () => {
        console.log("Server is listening on port 3000".yellow.bold);
    });
}
