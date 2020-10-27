const { Telegraf, Composer } = require("telegraf");
const colors = require("colors");
const env = require("../../apps/config/env.config");

const bot = new Telegraf(env.BOT_TOKEN);
const composer = new Composer();
const middleware = (composer) => bot.use(composer.middleware());

module.exports = { bot, composer, middleware };
