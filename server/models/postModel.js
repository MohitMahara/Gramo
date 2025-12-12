import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  url: { 
    type: String,
    required: true,
  },

  public_id: { 
    type: String,
    required: true,
  },

  fileType: { 
    type: String,
    enum: ["image", "video"],
    required: true,
  }
});

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    caption: {
      type: String,
    },

    postType : {
       type : String,
       enum : ["image", "video", "text"],
       required : true
    },

    media : [fileSchema]
  },
  { timestamps: true }
);

export default mongoose.model("posts", postSchema);