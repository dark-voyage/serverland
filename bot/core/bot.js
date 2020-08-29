const { token, domain, port, env } = require('./config')
const { Telegraf, Composer } = require('telegraf')
const colors = require('colors')

const bot = new Telegraf(token)
const composer = new Composer()
const middleware = (composer) => bot.use(composer.middleware())

const launch = async (app) => {
    if (env === "heroku") {

        // Removing old webhook path
        await bot.telegram.deleteWebhook()

        // Setting up webhook
        await bot.telegram.setWebhook(`https://api.genemator.me/bot`)

        // Starting webhook session
        app.use(bot.webhookCallback('/bot'))
            .then(async () => {
                await console.log("Webhook method has been chosen for telegram bot".yellow)
            })
            .catch(async error => {
                await console.log(error)
            })
    } else if (env === "local") {
        await bot.launch()
            .then(async () => {
                await console.log("Polling method has been chosen for telegram bot".yellow)
            })
            .catch(async error => {
                await console.log(error)
            })
    } else {
        await console.log("Bot can't be started due to wrong environment!".red)
    }
    require('../actions')
}

module.exports = { bot, composer, middleware, launch }
