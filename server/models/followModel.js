import mongoose from "mongoose";

const followSchema = new mongoose.Schema({

    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
    
}, { timestamps: true });

export default mongoose.model("follows", followSchema);