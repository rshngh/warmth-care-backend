import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { fetchChat } from "../controllers/chat.controller.js";

const router = express.Router();

router.route("/").get(verifyToken, fetchChat);

export default router;
