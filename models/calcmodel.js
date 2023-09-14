const mongoose = require('mongoose');

const calcSchema = mongoose.Schema({
  email: {
    type: String,
  },
  data: [
    {
      goldrate: String,
      gstgold: String,
      total: String,
    },
  ],
});

const calcModel = mongoose.model('calc', calcSchema);

module.exports = calcModel;
