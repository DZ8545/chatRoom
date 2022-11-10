const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  message: String,
  time: Number,
  roomId: {
    type: String,
  },
  userName: {
    type: String,
  },
});

module.exports = mongoose.model("Message", schema);
