import express from "express";
import multer from "multer";
import {
  createPostsController,
  getPostController,
  deletePostController,
  updatePostController,
  getUserPostController,
  likesController,
  getlikesController,
  getCommentsController,
  addCommentController,
  hasLikedController,
  deleteCommentController
} from "../controllers/postsController.js";

const router = express.Router();


const upload = multer({
  storage: multer.memoryStorage(),
});


router.post("/create-post", upload.array("media"), createPostsController);

router.get("/get-posts", getPostController);

router.get("/get-posts/:username", getUserPostController);

router.delete("/delete-post/:pid", deletePostController);

router.put("/update-post/:pid", updatePostController);

// likes and Comments

router.post("/:postId/:userId/like", likesController);

router.get("/get-likes/:postId", getlikesController);

router.get('/has-liked/:postId/:userId', hasLikedController);

router.get("/get-comments/:postId", getCommentsController);

router.post("/add-comment/:postId/:userId", addCommentController);

router.delete('/delete-comment/:postId/:cmtId', deleteCommentController);



export default router;
