const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: { type: String },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
