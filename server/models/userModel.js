import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },

    authProvider: {
      type: String,
    },

    googleId: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
    },

    photoURL: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
