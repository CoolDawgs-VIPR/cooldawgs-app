const mongoose = require("mongoose");

const tempSchema = new mongoose.Schema({
  Temp: {
    type: Number,
    required: true,
  },
  ownerUsername: {
    type: String,
    required: true,
  },
  Timestamp: {
    type: String,
    required: true,
  },
  petName: {
    type: String,
    required: true,
  },
});

module.exports = Temp = mongoose.model("temp", tempSchema);
