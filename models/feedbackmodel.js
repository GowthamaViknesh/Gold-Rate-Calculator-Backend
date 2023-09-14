const mongoose = require('mongoose');

//After the Mongo connectivity we have create the database collection with schema

const feedbackSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_no: {
    type: String,
  },
});

const feedbackModel = mongoose.model('feedback', feedbackSchema);

module.exports = feedbackModel;
