import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  
   name : {
    type : String,
    required : true,
    trim : true
   },

   username : {
     type : String,
     required : true,
     unique : true
   },

   email : {
    type : String,
    required : true,
    unique :  true
   },

   password : {
    type : String,
    required : true
   },

   profilePic : {
     type : String,
   }

}, {timestamps : true})


export default mongoose.model('users', userModel);