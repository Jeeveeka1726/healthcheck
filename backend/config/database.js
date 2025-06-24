const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.log('Running without database connection for demo purposes');
    // Don't exit the process, allow the app to run without DB for demo
  }
};

module.exports = connectDB;
