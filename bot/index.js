const { Telegraf, session } = require('telegraf');
const { Stage } = require('telegraf/scenes');
const dotenv = require('dotenv');
const { loginScene, passwordScene, logoutScene } = require('./scenes');

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const stage = new Stage([loginScene, passwordScene, logoutScene]);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  ctx.reply(
    'Welcome! Log in to receive notifications regarding new users confirmations. (Please use Your platform credentials.',
  );
});

bot.command('login', (ctx) => {
  ctx.scene.enter('loginScene');
});

bot.command('logout', (ctx) => {
  ctx.scene.enter('logoutScene');
});

const launchBot = async () => {
  try {
    console.log('Bot started...');
    await bot.launch();
  } catch (err) {
    console.log(err);
  }
};

const setupBot = async (app) => {
  const webhookPath = `/bot${bot.secretPathComponent()}`;
  app.use(bot.webhookCallback(webhookPath));
};

module.exports = { bot, launchBot, setupBot };
