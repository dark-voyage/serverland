const { Telegraf, Composer } = require("telegraf");
const colors = require("colors");
const env = require("../../apps/config/env.config");

const bot = new Telegraf(env.BOT_TOKEN);
const composer = new Composer();
const middleware = (composer) => bot.use(composer.middleware());

const launch = async () => {
  if (env.HOST === "heroku") {
    /**
     * Direct webhook method
     */
    // await bot.telegram.deleteWebhook()
    // await bot.telegram.setWebhook(`https://${env.APP}.herokuapp.com:8443/bot`)
    // await bot.startWebhook(`/bot`, null, 8443)
    // await console.log(`Direct webhook method has been chosen`.yellow)

    /**
     * Indirect webhook method
     */
    // await bot.launch({
    //     webhook: {
    //         domain: 'https://${env.APP}.herokuapp.com:8443/bot',
    //         hookPath: '/bot',
    //         port: 5000
    //     }
    // })
    //     .then(async () => {
    //         await console.log("Indirect webhook method has been chosen".yellow)
    //     })
    //     .catch(async error => {
    //         await console.log(error)
    //     })

    /**
     * Polling method
     */
    await bot.telegram.deleteWebhook();
    await bot.startPolling();
    await console.log("Long polling method has been chosen".yellow);
  } else if (env.HOST === "local") {
    await bot
      .launch()
      .then(async () => {
        await console.log("Polling method has been chosen".yellow);
      })
      .catch(async (error) => {
        await console.log(error);
      });
  } else {
    await console.log("Bot can't be started due to wrong environment!".red);
  }
  require("../action");
};

module.exports = { bot, composer, middleware, launch };
