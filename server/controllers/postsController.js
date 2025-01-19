import postModel from "../models/postModel.js";

export const createPostsController = async(req, res) => {
    try {

        const username = req.params.username;
        const {filePath, caption } = req.body;

        if(!filePath && !caption){
            return res.status(400).send({
                msg : "Post is empty.",
                success : false
            })
        }

        const post =  await new postModel({
           username : username,
           fileURL : filePath,
           caption : caption
        }).save();


        return res.status(200).send({
            msg : "Post created Successfully",
            success : true,
            post
        })

    } catch (error) {
        return res.status(500).send({
            msg : "Internal server error",
            success : false,
            error
        })
    }
}




export const getPostController = async(req, res) =>{
  try {
     const username = req.params.username;

    const posts = await postModel.find({username});

    return res.status(200).send({
        msg : "User posts",
        success : true,
        posts
    })


  } catch (error) {
    return res.status(500).send({
        msg : "Internal Server Error",
        success : false,
        error
    })
  }
}