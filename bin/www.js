/**
 * @name Serverland
 * @version 1.0.0
 * @description Express REST API Server for any purpose
 */

require('../apps/core/server').launch()
    .then(async () => {
    await console.log("Server is being started".green.bold)
})
    .catch(error => {
        console.log(`Error occurred while executing: ${error}`.red.bold)
    });

// require('../bots/core/bot').launch()
//     .then(async () => {
//     await console.log("Bot has been started")
// })
//     .catch(error => {
//     console.log(`Error occurred while executing: ${error}`)
// });
