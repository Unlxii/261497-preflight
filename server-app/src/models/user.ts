const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: { type: String, required: true },
  urls: [{ type: mongoose.Schema.Types.ObjectId, ref: "ShortUrl" }],
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
