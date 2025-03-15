import express from "express";
import {
  createPostsController,
  getPostController,
  deletePostController,
  updatePostController,
  likesController,
  getlikesController,
  getCommentsController,
  addCommentController,
  hasLikedController,
  deleteCommentController
} from "../controllers/postsController.js";

const router = express.Router();

router.post("/create-post/:username", createPostsController);

router.get("/get-posts/:username", getPostController);

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
