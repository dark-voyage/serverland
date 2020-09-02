const { composer, middleware } = require("../../core/bot");
const { Markup } = require("telegraf");
const axios = require("axios");

const consoles = require("../../layouts/consoles");
const baseUrl = `https://api.genemator.me/subscriber/`;

const status = async (people) => {
  return await axios.get(baseUrl + people).then((res) => {
    return res.data.registered;
  });
};

const create = async (people) => {
  return await axios
    .post(baseUrl, {
      id: people,
    })
    .then((res) => {
      return res.data;
    });
};

const remove = async (people) => {
  return await axios.delete(baseUrl + people).then((res) => {
    return res.data;
  });
};

composer.action(`subscribe`, async (ctx) => {
  const subscriber = ctx.from.id;

  const keyboard = async () => {
    if (await status(subscriber)) {
      return Markup.inlineKeyboard([
        Markup.callbackButton(`Unsubscribe from feed!`, `unsubscribe`),
      ]);
    } else {
      return Markup.inlineKeyboard([
        Markup.callbackButton(`Subscribe for feed!`, `subscribe`),
      ]);
    }
  };

  await create(subscriber)
    .then(async () => {
      await ctx.editMessageCaption(
        `<b>Congrats, now you're subscribed! ☺</b>`,
        {
          parse_mode: "HTML",
          reply_markup: await keyboard(),
        }
      );
    })
    .catch((errors) => console.log(errors));
});

composer.action(`unsubscribe`, async (ctx) => {
  const subscriber = ctx.from.id;

  const keyboard = async () => {
    if (await status(subscriber)) {
      return Markup.inlineKeyboard([
        Markup.callbackButton(`Unsubscribe from feed!`, `unsubscribe`),
      ]);
    } else {
      return Markup.inlineKeyboard([
        Markup.callbackButton(`Subscribe for feed!`, `subscribe`),
      ]);
    }
  };

  await remove(subscriber)
    .then(async () => {
      await ctx.editMessageCaption(`<b>Sorry to see you going!</b> 😔`, {
        parse_mode: "HTML",
        reply_markup: await keyboard(),
      });
    })
    .catch((errors) => console.log(errors));
});

middleware(composer);
consoles.module(__filename);
