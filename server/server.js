const { app } = require('../index');
const { connectDB } = require('../db/connection');
const { launchBot } = require('../bot');

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, (err) => {
      if (err) throw new Error('Error at server launch', err);
      console.log(`Server running on port ${PORT}`);
    });
    await launchBot();
  } catch (err) {
    console.log(err);
  }
};

startServer();
