import mongoose, { Schema, Document } from 'mongoose';

interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  urls: mongoose.Types.ObjectId[];
}

const userSchema: Schema<UserInterface> = new Schema({
  name: { type: String },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  urls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShortUrl' }],
});

const UserModel = mongoose.model<UserInterface>('User', userSchema);

export default UserModel;