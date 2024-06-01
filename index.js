const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const listingRouter = require('./routes/listingRoutes');

const morgan = require('morgan');
const dotenv = require('dotenv');
const { setupBot } = require('./bot');
const cors = require('cors')

dotenv.config();
app.use(cors())
app.use(express.json());
app.use(morgan('tiny'));

app.use('/user', userRouter);
app.use('/listing', listingRouter);
app.use('/', authRouter);

setupBot(app);

// Centralized requests error handler.
app.use((err, req, res) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

// 404 request Handler.
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not Found',
  });
});

module.exports = { app };
