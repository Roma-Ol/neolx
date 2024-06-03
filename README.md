# Backend application for Final Project (NodeJS / Express / Mongo / Telegram bot integration / React)

## Prerequisites

- Node.js and npm
- MongoDB Atlas account
- Ngrok (for exposing your local server to the internet)

## Environment Variables

Create a `.env` file in the root of your project with the following content:

```env
# MongoDB connection string
MONGO_ATLAS_CONNECTION_STRING=your_mongo_connection_string

# Database name
MONGO_ATLAS_DB_NAME=your_db_name

# Telegram bot token
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# Application port
PORT=3000

# Ngrok subdomain (to be set after starting ngrok)
NGROK_SUBDOMAIN=your_ngrok_subdomain
```

## Steps to run
1. Install the dependencies:
```npm i```
2. Start the Local Node.js Application:
```npm run start```
3. Start the Telegram Bot and set the WebHook:
```node setupWebhook.js```
   (Note the https forwarding address provided by Ngrok (e.g., https://abcd1234.ngrok-free.app).)
4. Update the Telegram Webhook URL Using the Ngrok Address
```curl -F "url=https://<your-ngrok-subdomain>.ngrok-free.app/bot<your-bot-secret-path>" https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/setWebhook```

## How It Works
 1.	Express App: Handles HTTP requests and integrates with the Telegraf bot via webhooks.
 2.	Telegraf Bot: Configured to handle Telegram bot commands and messages.
 3.	MongoDB: Stores user data and handles authentication.