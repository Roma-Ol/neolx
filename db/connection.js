const mongoose = require('mongoose');

const MONGO_ATLAS_CONNECTION_STRING = process.env.MONGO_ATLAS_CONNECTION_STRING;
const MONGO_ATLAS_DB_NAME = process.env.MONGO_ATLAS_DB_NAME;

const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGO_ATLAS_CONNECTION_STRING}/${MONGO_ATLAS_DB_NAME}`);
    console.log('Database connection successful');
  } catch (err) {
    throw new Error('Failed to connect to database: ' + err);
  }
};

module.exports = { connectDB };
