/**
 * @name Serverland
 * @version 1.0.0 beta
 * @description Express REST API Server for any purpose
 */

// Loading up environment
require("../apps/config/env.config");

// Starting up an Express based application
require("../apps/core/server")
  .launch()
  .then(async () => {
    await console.log("Server is being started".green.bold);
  })
  .catch(async (error) => {
    await console.log(`Error occurred while executing: ${error}`.red.bold);
  });

// // Launching up telegram bot with Long Polling session
// require("../bot/core/bot")
//   .launch()
//   .then(async () => {
//     await console.log("Bot has been started".green.bold);
//   })
//   .catch(async (error) => {
//     await console.log(`Error occurred while executing: ${error}`.red.bold);
//   });
