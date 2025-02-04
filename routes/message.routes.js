import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessages,
  deleteMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", verifyToken, getUsersForSidebar);
router.get("/chat/:id", verifyToken, getMessages);
router.post("/send/:id", verifyToken, sendMessages);
router.delete("/delete", verifyToken, deleteMessages);

export default router;
