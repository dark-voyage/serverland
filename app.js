/**
 * @name Serverland
 * @version 1.0.0
 * @description Express REST API Server for any purpose
 */

require('./application/core/server').launch().then(async () => {
    await console.log("Application is being started")
});
