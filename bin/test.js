/**
 * @name Serverland Test CI
 * @version 1.0.0
 * @description Express REST API Server for any purpose
 */

const isReachable = require('is-reachable');
const colors = require('colors');
const fetch = require('node-fetch')

// Test function created manually by myself
const test = async (endpoint) => {
    await fetch('http://localhost:3000/' + endpoint, {
        method: 'GET'
    })
        .then(res => {
            switch (res.ok) {
                case true:
                    console.log(`PASS`.bgGreen.white + ` /${endpoint || ''}`.yellow)
                    break;
                case false:
                    console.log(`FAIL`.bgRed.white + ` /${endpoint || ''}`.yellow)
                    break;
            }
        })
        .catch(err => {
            throw new Error(err)
        })
}

// Main function
(async () => {

    // Initializing application for test
    await console.log(`\n` + `INIT PHASE`.bgYellow.red + `\n`)
    await require('../apps/core/server').launch()
        .then(async () => {
            await console.log("Server is being started".yellow.bold)
        })
        .catch(error => {
            console.log(`Error occurred while executing: ${error}`.red.bold)
        });

    // Starting test phase
    switch (await isReachable('127.0.0.1:3000')) {
        case true:
            await console.log("Application is reachable!".green.bold);
            await console.log(`\n` + `TEST PHASE`.bgYellow.red + `\n`)
            await test('')
            await test('posts')
            await test('notes')
            break;
        case false:
            await console.log("Application is not reachable!".red.bold)
            process.exit(1)
            break;
    }
})();




