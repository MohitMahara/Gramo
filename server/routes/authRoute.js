import express from "express";
import {
  registerController,
  loginController,
  getUserProfileController,
  followController,
  getFollowersCountController,
  getFollowingCountController
} from "../controllers/authController.js";


const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/user/:username", getUserProfileController);

router.post("/user/follow", followController);

router.get("/user/followers-count/:userId", getFollowersCountController);

router.get("/user/following-count/:userId", getFollowingCountController);


export default router;