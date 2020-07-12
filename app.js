/**
 * @name Serverland
 * @version 1.0.0
 * @desc Express REST API Server for any purpose
 */

require('./core/server').launch().then(r => {
    console.log("Application is being started")
});
