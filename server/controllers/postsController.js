import commentsModel from "../models/commentsModel.js";
import likesModel from "../models/likesModel.js";
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


export const likesController = async (req, res) =>{
     try {
        const userId = req.params.userId;
        const postId = req.params.postId;

        const likeExist = await likesModel.findOne({userId : userId, postId : postId});

        if(likeExist){
          await likesModel.deleteOne({userId : userId, postId : postId});
          return res.status(200).send({
             success : true,
             liked : false,
             msg : "unliked the post successfully"
          })
        }
        else{
           const like = new likesModel({
              userId, 
              postId
           }).save();

           return res.status(200).send({
            success : true,
            liked : true,
            msg : "Liked the post successfully"
           })
        }

     } catch (error) {
        res.status(500).send({
          msg : "Internal server error",
          success : false,
          error
        })
     }
}



export const getlikesController = async (req, res) =>{
    try {
        const postId = req.params.postId;
        
        const likes = await likesModel.find({postId : postId});

        return res.status(200).send({
          success : true,
          msg : "Liked By",
          likes
        })

    } catch (error) {
        res.status(500).send({
            success : false, 
            msg : "Error while getting likes",
            error
        })
    }
}




export const getCommentsController = async (req, res) =>{
    try {
        const postId = req.params.postId;
        
        const comments = await commentsModel.find({postId : postId}).populate("userId", "username photoURL");

        return res.status(200).send({
          success : true,
          msg : "all comments",
          comments
        })

    } catch (error) {
        res.status(500).send({
            success : false, 
            msg : "Error while getting comments",
            error
        })
    }
}



export const addCommentController = async(req, res) =>{
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;
        const {commentText} = req.body;

        if(!commentText) return res.status(300).send({success : false, msg : "Comment can not be blanked"});

        const comment = new commentsModel({
            postId, 
            userId, 
            cmtText : commentText
        }).save();
        
        return res.status(200).send({
            msg : "Comment added Successfully",
            success : true, 
        })

    } catch (error) {
        return res.status(500).send({
            msg : "Error while adding comment",
            success : false,
            error
        })
    }
}