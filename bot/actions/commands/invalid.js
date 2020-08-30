const { composer, middleware } = require("../../core/bot");

composer.on("text", async (ctx) => {
  await ctx.replyWithHTML(`<b>Invalid command entry:</b> ${ctx.message.text}`);
});

middleware(composer);
