const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  roomId: { type: String, unique: true },
  roomName: { type: String},
  password: { type: String },
  roomMasterId: { type: String },
});
module.exports = mongoose.model("Room", schema);
