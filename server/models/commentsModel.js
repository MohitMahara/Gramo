import mongoose from "mongoose";

const commentModel   = new mongoose.Schema({
    postId :{
        type: mongoose.Schema.Types.ObjectId,  
        ref : "posts",
        required : true
    },

    userId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref : "users", 
        required : true
    },

    cmtText : {
        type : String, 
        required : true
    }
}, {timestamps : true});

export default mongoose.model("comments", commentModel);