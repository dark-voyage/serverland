const { composer, middleware } = require("../../core/bot");

composer.help(async (ctx) => {
  await ctx.replyWithHTML(`<b>Help command activated</b>`);
});

middleware(composer);
