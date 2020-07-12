exports.initialize = async () => {
    // Configuring the database
        const dbConfig = require('../config/database.config.js');
        const mongoose = require('mongoose');

        mongoose.Promise = global.Promise;

    // Connecting to the database
        await mongoose.connect(await dbConfig(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        }).then(() => {
            console.log("Successfully connected to the database");
        }).catch(err => {
            console.log('Could not connect to the database. Exiting now...', err);
            process.exit();
        });
}