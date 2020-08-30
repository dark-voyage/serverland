const { composer, middleware } = require("../../core/bot");

composer.start(async (ctx) => {
  await ctx.replyWithHTML("<b>Start command working!!!</b>");
});

middleware(composer);
