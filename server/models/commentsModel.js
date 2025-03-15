import mongoose from "mongoose";
import userModel from "./userModel.js";

const commentModel   = new mongoose.Schema({
    postId :{
        type: String,  
        required : true
    },

    userId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref : userModel, 
        required : true
    },

    cmtText : {
        type : String, 
        required : true
    }
}, {timestamps : true});

export default mongoose.model("comments", commentModel);