const { Telegraf, Composer } = require('telegraf')
const colors = require('colors')

const bot = new Telegraf(process.env.BOT_TOKEN)
const composer = new Composer()
const middleware = (composer) => bot.use(composer.middleware())

const launch = async () => {
    if (process.env.HOST === "heroku") {
        // Direct webhook method
            // await bot.telegram.deleteWebhook()
            // await bot.startWebhook('/bot', null, 8443)
            // await bot.telegram.setWebhook('https://api.genemator.me:8443/bot')

        // Indirect webhook method
            // await bot.launch({
            //     webhook: {
            //         domain: 'https://api.genemator.me',
            //         hookPath: '/bot',
            //         port: 5000
            //     }
            // })
            //     .then(async () => {
            //         await console.log("Webhook method has been chosen".yellow)
            //     })
            //     .catch(async error => {
            //         await console.log(error)
            //     })
        // Polling method
            await bot.telegram.deleteWebhook()
            await bot.startPolling(1000)
    } else if (process.env.HOST === "local") {
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