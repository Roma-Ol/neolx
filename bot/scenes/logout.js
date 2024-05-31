const { Scenes, Markup } = require('telegraf');
const { unsubscribeFromNotifications } = require('../../services/tgNotificationService');
const { User } = require('../../models');

const logoutScene = new Scenes.BaseScene('logoutScene');

logoutScene.enter(async (ctx) => {
  try {
    const chatId = ctx.message.chat.id;
    const chatIdExists = await User.exists({ telegramChatId: chatId });

    if (!chatIdExists) {
      throw new Error(`You aren't logged in!`);
    }

    ctx.session.chatId = chatId;
    await ctx.reply(
      'Are you sure you want to log out?',
      Markup.inlineKeyboard([
        Markup.button.callback('Yes', 'logout_yes'),
        Markup.button.callback('No', 'logout_no'),
      ]),
    );
  } catch (err) {
    await ctx.reply(err);
    await ctx.scene.leave();
  }
});

logoutScene.action('logout_yes', async (ctx) => {
  try {
    const chatId = ctx.session.chatId;

    await unsubscribeFromNotifications(chatId);
    await ctx.reply('You have been logged out successfully.');
  } catch (err) {
    await ctx.reply(err);
  }
  ctx.scene.leave();
});

logoutScene.action('logout_no', (ctx) => {
  ctx.reply('Logout cancelled.');
  ctx.scene.leave();
});

module.exports = {
  logoutScene,
};
