import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/hashPassword.js";


export const registerController = async(req, res, next) =>{
    try {
        const {name , email, username, password} = req.body;

        if(!name || !email || !username || !password){
            return res.status(404).send({
                success : false,
                msg : "All fields are required"
            })
        }

        const isUsernameExists = await userModel.findOne({username});

        if(isUsernameExists){
            return res.status(400).send({
                success : false,
                msg : "The username is already taken. Please try a different one."
            })
        }

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(400).send({
                success : false,
                msg : "This email is already registered. Please log in or use another email."
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await new userModel({
            name : name,
            email : email,
            username : username,
            password : hashedPassword,
            authProvider : "email",
            googleId : null,
            photoURL : null,
        }).save();

        res.status(200).send({
            msg : "User created successfully",
            success : true,
        })
        
    } catch (error) {
        next(error);
    }
}


export const loginController = async(req, res, next) => {
  try {
      
    const {email, password, username} = req.body;

    if(!password || !email && !username){
        return res.status(404).send({
            success : false,
            msg : "Email/Username and Password are required fields"
        })
    }

    let user;

    if(username){
     user = await userModel.findOne({username});
    }else{
     user = await userModel.findOne({email});
    }

    if(!user){
        return res.status(400).send({
            success : false,
            msg : "Incorrect Email/Username",
        })
    }

    const isMatch = await comparePassword(password, user.password);

    if(!isMatch){
        return res.status(400).send({
            success : false,
            msg : "Incorrect Password"
        })
    }

    const token = jwt.sign({ _id: user._id },  process.env.JWT_SECRET,  { expiresIn: "1h" } );

    const resUser = {
        _id : user._id,
        name : user.name,
        username : user.username,
        email : user.email,
        photoURL : user.photoURL,
    }

    return res.status(200).send({
        success : true,
        msg : "Login Successfully",
        user : resUser,
        token
    })

  } catch (error) {
     next(error);
  }
}


export const getUserProfileController = async(req, res, next) =>{
    try {
        const {username} = req.params;

        if(!username){
          return res.status(404).send({
            success : false,
            msg : "Username is required"
          })
        }

        const user = await userModel.findOne({username}).select("-password -googleId -authProvider -createdAt -updatedAt -__v");
       
        if(!user){
          return res.status(404).send({
            success : false,
            msg : "User not found"
          })
        }

        return res.status(200).send({
          success : true,
          user
        });

    } catch (error) {
        next(error);
    }
}