import express from "express";
import {
  registerController,
  loginController,
  getUserProfileController,
  followController
} from "../controllers/authController.js";


const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/user/:username", getUserProfileController);

router.post("/user/follow", followController);


export default router;