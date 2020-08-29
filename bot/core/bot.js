const { token, domain, port, env } = require('./config')
const { Telegraf, Composer } = require('telegraf')
const colors = require('colors')

const bot = new Telegraf(token)
const composer = new Composer()
const middleware = (composer) => bot.use(composer.middleware())

const launch = async (app) => {
    if (env === "heroku") {
        await app.use(bot.webhookCallback('/bot'))
            .then(async () => {
                await console.log("Webhook method has been chosen".yellow)
            })
            .catch(async error => {
                await console.log(error)
            })
    } else if (env === "local") {
        await bot.launch()
            .then(async () => {
                await console.log("Polling method has been chosen".yellow)
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
