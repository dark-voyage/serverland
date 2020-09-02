const { composer, middleware } = require('../../core/bot')
const { Markup } = require('telegraf')
const axios = require('axios')

const consoles = require('../../layouts/consoles')

const status = async (people) => {
    return await axios.get('http://localhost:3000/subscriber/' + people)
        .then(res => {
            return res.data.registered
        })
}

composer.command(`subscribe`, async ctx => {
    const subscriber = ctx.from.id
    const keyboard = async () => {
        if (await status(subscriber)) {
            return Markup.inlineKeyboard([
                Markup.callbackButton(`Unsubscribe from feed!`, `unsubscribe`)
            ])
        }
        else {
            return Markup.inlineKeyboard([
                Markup.callbackButton(`Subscribe for feed!`, `subscribe`)
            ])
        }
    }


    const text = async () => {
        if (await status(subscriber)) {
            return `registered`
        }
        else {
            return `unregistered`
        }
    }

    await ctx.replyWithAnimation({url: 'https://media.giphy.com/media/xT77XUw1XMVGIxgove/source.gif'}, {
        parse_mode: "HTML",
        caption: `<b>Your status is:</b> <code>${await text()}</code>`,
        reply_markup: await keyboard()
    })
})

middleware(composer)
consoles.module(__filename)
