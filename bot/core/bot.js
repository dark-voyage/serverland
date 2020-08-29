const { token, domain, port, env } = require('./config')
const { Telegraf, Composer } = require('telegraf')
const colors = require('colors')

const bot = new Telegraf(token)
const composer = new Composer()
const middleware = (composer) => bot.use(composer.middleware())

module.exports = { bot, composer, middleware }
