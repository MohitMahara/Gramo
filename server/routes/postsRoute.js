import express from "express";
import { createPostsController, getPostController, deletePostController, updatePostController } from "../controllers/postsController.js";

const router = express.Router();


router.post('/create-post/:username', createPostsController);

router.get('/get-posts/:username', getPostController);

router.delete('/delete-post/:pid', deletePostController);

router.put('/update-post/:pid', updatePostController);





export default router;