import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
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

export default mongoose.model("comments", commentSchema);