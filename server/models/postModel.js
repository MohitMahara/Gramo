import mongoose from "mongoose";

const postModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
    },

    caption: {
      type: String,
    },

    fileURL: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("posts", postModel);
