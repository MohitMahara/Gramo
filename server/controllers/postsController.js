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




export const deletePostController = async(req, res) =>{
    try {
        const pid = req.params.pid;

        const deletedPost = await postModel.findByIdAndDelete(pid);

        if(!deletedPost){
            return res.status(404).send({
                msg : "Post not Found",
                success : false,
            })
        }
        
        return res.status(200).send({
            msg : "Post deleted successfully",
            success : true
        })

    } catch (error) {
        res.status(500).send({
            msg : "Error while deleting Post",
            success : false, 
            error
        })
    }
}


export const updatePostController = async(req, res) =>{
   try {
     const pid = req.params.pid;
     const {caption} = req.body;

     const updatedPost = await postModel.findByIdAndUpdate(pid, {caption}, {new : true});

     if(!updatedPost){
         return res.status(404).send({
             msg : "Post not Found",
             success : false,
         })
     }

     
     return res.status(200).send({
         msg : "Post Updated successfully",
         success : true
     })

   } catch (error) {
    res.status(500).send({
        msg : "Error while updating Post",
        success : false, 
        error
    })
   }
}