const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const listingRouter = require('./routes/listingRoutes');

const morgan = require('morgan');
const dotenv = require('dotenv');
const { setupBot } = require('./bot');
const cors = require('cors')
const { statusCode } = require('./utils/constants');

dotenv.config();
app.use(cors())
app.use(express.json());
app.use(morgan('tiny'));

app.use('/user', userRouter);
app.use('/listing', listingRouter);
app.use('/', authRouter);

setupBot(app);

// 404 request Handler.
app.use((req, res, next) => {
  res.status(statusCode.NOT_FOUND).json({
    status: 'error',
    code: statusCode.NOT_FOUND,
    message: 'Not Found'
  });
});

// Centralized requests error handler.
app.use((err, req, res) => {
  res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});


module.exports = { app };
