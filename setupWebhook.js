require('dotenv').config();
const ngrok = require('ngrok');
const axios = require('axios');

const startNgrokAndSetWebhook = async () => {
  try {
    // Start ngrok
    const url = await ngrok.connect({
      addr: process.env.PORT || 3000,
      authtoken: process.env.NGROK_AUTH_TOKEN,
    });

    console.log(`Ngrok tunnel established at: ${url}`);

    const webhookUrl = `${url}/bot${process.env.TELEGRAM_BOT_SECRET_PATH}`;

    // Set the webhook for Telegram
    const telegramResponse = await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setWebhook`,
      {
        url: webhookUrl,
      }
    );

    console.log('Telegram webhook set:', telegramResponse.data);
  } catch (error) {
    console.error('Error setting up ngrok and webhook:', error);
  }
};

startNgrokAndSetWebhook();