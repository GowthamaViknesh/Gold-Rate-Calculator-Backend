const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//Create a Monogo db connection port
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch((err) => {
      console.log('Connectivity error', err);
    });
};

module.exports = connectDB;
