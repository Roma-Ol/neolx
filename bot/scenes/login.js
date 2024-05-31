const { Scenes } = require('telegraf');
const { loginUser } = require('../../services/authService');
const { subscribeToNotification } = require('../../services/tgNotificationService');
const { User } = require('../../models');

const loginScene = new Scenes.BaseScene('loginScene');

loginScene.enter(async (ctx) => {
  try {
    const chatExists = await User.exists({ telegramChatId: ctx.message.chat.id });

    if (chatExists) {
      throw new Error(`You are already logged in!`);
    }

    ctx.reply('Please enter your email:');
  } catch (err) {
    ctx.reply(err);
    ctx.scene.leave();
  }
});

loginScene.on('text', (ctx) => {
  const email = ctx.message.text;
  ctx.session.email = email;
  ctx.scene.enter('passwordScene');
});

const passwordScene = new Scenes.BaseScene('passwordScene');

passwordScene.enter((ctx) => {
  ctx.reply('Please enter your password:');
});

passwordScene.on('text', async (ctx) => {
  const email = ctx.session.email;
  const password = ctx.message.text;
  const chatId = ctx.message.chat.id;

  try {
    const user = await loginUser({ email, password });

    if (user) {
      await subscribeToNotification(chatId, email);
      ctx.reply('Successfully logged in. You will now receive users confirmations notifications.');
    }
  } catch (err) {
    ctx.reply(err);
    ctx.scene.leave();
  }
});

module.exports = {
  loginScene,
  passwordScene,
};
