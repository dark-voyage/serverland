const { token, domain, port, env } = require('../config/config')
const { Telegraf, Composer } = require('telegraf')

const bot = new Telegraf(token)
const composer = new Composer()
const middleware = (composer) => bot.use(composer.middleware())

if (env.toLowerCase() === "heroku") {
    bot.launch({
        webhook: {
            domain: domain,
            hookPath: '/bot',
            port: port
        }
    })
        .then(() => {
        console.log("Webhook method has been started")
    })
        .catch(error => {
        console.log(error)
    })
} else if (env.toLowerCase() === "local") {
    bot.launch()
        .then(() => {
        console.log("Polling method has been started")
    })
        .catch(error => {
            console.log(error)
        })
} else {
    console.log("Bot can't be started due to wrong environment!")
}
module.exports = { bot, composer, middleware }
