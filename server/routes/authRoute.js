import express from "express";
import {
  registerController,
  loginController,
  getUserProfileController
} from "../controllers/authController.js";


const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/user/:username", getUserProfileController);


export default router;