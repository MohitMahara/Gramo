import mongoose from "mongoose";
import userModel from "./userModel.js";

const likesModel = new mongoose.Schema({
  postId : {
    type : String, 
    required : true
  },
  
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : userModel, 
    required : true
  }
}, {timestamps : true});

export default mongoose.model("likes", likesModel);