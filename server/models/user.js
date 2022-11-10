const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String, unique: true },
  password: { type: String },
  email: { type: String },
  headImg: { type: String },
});
module.exports = mongoose.model("User", schema);
