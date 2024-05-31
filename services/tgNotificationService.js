const axios = require('axios');
const { User } = require('../models');
const { ForbiddenException } = require('../utils/exceptions');
const { updateUser } = require('./userServices');

const sendTelegramApproveRequest = async (userName, userEmail) => {
  const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(TELEGRAM_API_URL, {
      chat_id: '387448024',
      text: `New approve request - ${userName} (${userEmail}).Please, visit the admin panel to verify user.`,
      parse_mode: 'HTML',
    });
  } catch (error) {
    console.error('Failed to send Telegram message', error);
  }
};

const subscribeToNotification = async (chatId, email) => {
  const userData = await User.findOne({ email });

  if (userData?.role !== 'admin') throw new ForbiddenException(`This bot is for admins only!`);

  await updateUser(userData._id, { telegramChatId: chatId });
};

const unsubscribeFromNotifications = async (chatId) => {
  const userData = await User.findOne({ telegramChatId: chatId });

  await updateUser(userData._id, { telegramChatId: '' });
};

module.exports = {
  subscribeToNotification,
  unsubscribeFromNotifications,
  sendTelegramApproveRequest,
};
