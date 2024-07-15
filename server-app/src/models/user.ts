const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: String,
  urls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShortUrl",
    },
  ],
});

export const UserModel = mongoose.model("User", userSchema);
