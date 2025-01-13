import express from "express";
import {
  registerController,
  getUserController,
  updateProfileController,
  loginController,
  usernameExistsController
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/username-exists", usernameExistsController);

router.get("/get-user/:uid", getUserController);

router.put("/update-profile/:uid", requireSignIn, updateProfileController);

export default router;
