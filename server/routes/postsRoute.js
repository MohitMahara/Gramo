import express from "express";
import { createPostsController, getPostController } from "../controllers/postsController.js";

const router = express.Router();


router.post('/create-post/:username', createPostsController);

router.get('/get-posts/:username', getPostController);




export default router;