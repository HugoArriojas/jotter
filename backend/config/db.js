// Used to connect to mongoDB using mongoose
const mongoose = require('mongoose');

// All mongoose methods are async as they return a promise
const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // using colors package to style this message
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log('Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
