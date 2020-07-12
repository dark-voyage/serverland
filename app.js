/**
 * @name Serverland
 * @version 1.0.0
 * @description Express REST API Server for any purpose
 */

require('./apps/core/server').launch().then(async () => {
    await console.log("Application is being started")
});

require('./bots/core/bot').launch().then(async () => {
    await console.log("Bot has been started")
})