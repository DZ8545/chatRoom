const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  roomId: { type: String, unique: true },
  roomName: { type: String, unique: true },
  isSecret: { type: Boolean },
  roomImg: { type: String },
});
module.exports = mongoose.model("Room", schema);
