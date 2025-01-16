import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/hashPassword.js";


export const registerController = async(req, res) =>{
    try {
        const {name , email, username, password} = req.body;

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
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg : "Error while adding the user in db",
            success : false,
            error
        }
        )
    }
}




export const loginController = async(req, res) => {
  try {
      
    const {email, password} = req.body;
    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).send({
            success : false,
            msg : "Incorrect Email",
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

    return res.status(200).send({
        success : true,
        msg : "Login Successfully",
        user,
        token
    })

  } catch (error) {
     console.log(error);
     res.status(500).send({
        success : false,
        msg : "Error while login",
        error
     })
  }

}



export const usernameExistsController = async(req, res) =>{
    try {
        const {username} = req.body;

        const user = await userModel.findOne({username});

        if(!user){
            return res.status(404).send({
                msg : "No user found",
                success : false
            })
        }

        return res.status(200).send({
            msg : "User found",
            success : true
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg : "Error while checking username existance",
            error
        })
    }
}




export const signUpWithGoogleController = async(req, res) =>{
    try {
       
      const {userData} = req.body;


       const name  = userData.name
       const email  =  userData.email
       const photo  = userData.photo
       const username  = userData.username
       const googleId =  userData.uid

       const isExists = await userModel.findOne({email});
       
       if(!isExists){
          const user = await new userModel({
              name : name,
              email: email,
              photoURL : photo,
              password : null,
              username : username,
              googleId : googleId,
              authProvider : "google"

          }).save();

          return res.status(200).send({
            msg : "User Registered Successfully",
            success : true,
            user
           })

       }

       return res.status(200).send({
        msg : "User Registered Successfully",
        success : true,
        isExists
       })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg : "Internal Server Error",
            success : false,
        })
    }
}




export const getUserController = async(req, res) =>{
    try {
        const uid = req.params.uid;
        const user =  await userModel.findOne({uid : uid});

        if(!user){
            return res.status(404).send({
                success : false,
                msg : "User not found"
            })
        }

        res.status(200).send({
            success : true,
            msg : "user found",
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            msg : "Error while retreving user information",
            error
        })
    }
}




export const updateProfileController = async(req, res) =>{
    try {
        const uid = req.params.uid;
        const {name , username, imgPath} = req.body;

        
        const user = await userModel.findOneAndUpdate(
            { _id : uid},
            {name : name, username : username, photoURL : imgPath},
            { new: true }
        );

        user.save();
        
        res.status(200).send({
            msg : "Profile Updated Successfully",
            success : true,
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            msg :  "Error while updating user profile",
            error
        })
    }
}