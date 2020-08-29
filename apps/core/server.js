/**
 * @name Server Bootstrap
 * The main server where everything will be initialized
 */

const http = require('http');
const express = require('express');
const enforce = require('express-sslify');
const bodyParser = require('body-parser');
const database = require('../database/mongoose');
const dbConfig = require('../config/server.config');


// Create express app
const app = express();

exports.launch = async () => {

    // Enforce https
    if (process.env.HOST === "heroku") {
        app.use(enforce.HTTPS({ trustProtoHeader: true }))
    }

    // Parse apps/x-www-form-urlencoded
    await app.use(bodyParser.urlencoded({ extended: true }))

    // Parse apps/json
    await app.use(bodyParser.json())

    // Initializing MongoDB database
    await database.initialize()

    // Define a simple route
    await app.get('/', (req, res) => {
        res.redirect('https://genemator.me');
    });

    // Connecting routes
    await require('../../posts/routes')(app);
    await require('../../quotes/routes')(app);

    // Error handling
        // Handle 404
        app.use(function(req, res) {
            res.status(400);
            res.json({title: '404: Not Found'});
        });

        // Handle 500
        app.use(function(req, res, next, error) {
            res.status(500);
            res.json({title:'500: Internal Server Error', error: error});
        });


    // Listen for requests
    await (async () => {

        if (process.env.HOST === "heroku") {
            await http.createServer(app).listen(dbConfig(), () => {
                console.log("Server is listening on port 3000 => [heroku]".yellow.bold);
            });
        } else {
            await app.listen(dbConfig(), () => {
                console.log("Server is listening on port 3000 => [localhost]".yellow.bold);
            });
        }
    })();
}
