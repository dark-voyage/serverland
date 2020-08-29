const { composer, middleware } = require('../../core/bot')

composer.on(
    'text',
    async ctx => {
        await ctx.replyWithHTML("<b>Hello World</b>")
    }
)

middleware(composer)