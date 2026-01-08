import express from "express";
import multer from "multer";

import {
  registerController,
  loginController,
  getUserProfileController,
  followController,
  getFollowersCountController,
  getFollowingCountController,
  editProfileController,
  updateProfilePicController
} from "../controllers/authController.js";

const upload = multer({
  storage: multer.memoryStorage(),
});


const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.put("/user/:uid/profile/edit", editProfileController);

router.put("/user/:uid/profile/update-image",upload.single("profile"), updateProfilePicController);

router.get("/user/:username", getUserProfileController);

router.post("/user/follow", followController);

router.get("/user/followers-count/:userId", getFollowersCountController);

router.get("/user/following-count/:userId", getFollowingCountController);


export default router;