const { composer, middleware } = require("../../core/bot");
const isReachable = require("is-reachable");

const consoles = require("../../layouts/consoles");
const message = require("../../layouts/messages");
const keyboard = require("../../layouts/keyboards");

composer.action(`check`, async (ctx) => {
  const uptime = await new Date().toLocaleString();

  const github = async () => {
    if (await isReachable("api.github.com")) {
      return "STABLE";
    } else {
      return "UNSTABLE";
    }
  };

  const telegram = async () => {
    if (await isReachable("api.telegram.org")) {
      return "STABLE";
    } else {
      return "UNSTABLE";
    }
  };

  const server = async () => {
    if (await isReachable("genemator.uz")) {
      return "STABLE";
    } else {
      return "UNSTABLE";
    }
  };

  const website = async () => {
    if (await isReachable("genemator.uz")) {
      return "STABLE";
    } else {
      return "UNSTABLE";
    }
  };

  await ctx.editMessageCaption(
    await message.check(
      await github(),
      await telegram(),
      await server(),
      await website(),
      uptime
    ),
    {
      parse_mode: "HTML",
      reply_markup: keyboard.check,
    }
  );
});

middleware(composer);
consoles.module(__filename);
