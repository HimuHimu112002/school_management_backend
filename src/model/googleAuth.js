const mongoose = require("mongoose");
const DataShema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String },
  email: { type: String, required: true, unique: true },
  image: { type: String },
});

const AuthModel = mongoose.model('auth', DataShema);
module.exports = AuthModel
