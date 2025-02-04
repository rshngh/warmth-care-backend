import express from "express";
import {
  checkAuth,
  logIn,
  logOut,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(logIn);
router.route("/logout").post(logOut);
router.route("/auth/check").get(verifyToken, checkAuth);

export default router;
