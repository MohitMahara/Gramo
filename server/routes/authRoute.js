import express from "express";
import {
  registerController,
  getUserController,
  updateProfileController,
  loginController,
  usernameExistsController,
  signUpWithGoogleController
} from "../controllers/authController.js";

import { requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/username-exists", usernameExistsController);

router.get("/get-user/:uid", getUserController);

router.post("/register-google", signUpWithGoogleController);

router.put("/update-profile/:uid", updateProfileController);

export default router;
