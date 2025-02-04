import asyncHandler from "express-async-handler";
import Message from "../models/message.model.js";

export const getUsersForSidebar = asyncHandler(async (req, res) => {
  return res.status(200).json({ message: "Getting sidebar users" });
});

export const getMessages = asyncHandler(async (req, res) => {
  const warmthCareBotId = req.params.id;
  const loggedInUserId = req.user._id.toString();
  const testUserId = process.env.TEST_USER_ID;

  if (loggedInUserId === testUserId) {
    console.log("test User logged in");
    return res.status(200).json("");
  }

  try {
    const messages = await Message.find({
      $or: [
        { senderId: warmthCareBotId, receiverId: loggedInUserId },
        { senderId: loggedInUserId, receiverId: warmthCareBotId },
      ],
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

export const sendMessages = asyncHandler(async (req, res) => {
  const botId = process.env.MISS_WARMTH_ID;
  const loggedInUserId = req.user._id.toString();
  const paramsId = req.params.id;
  const { text } = req.body;

  console.log("loggedInUserId", loggedInUserId);
  console.log("paramsId", paramsId);
  console.log("botId", process.env.MISS_WARMTH_ID);

  try {
    const newMessage = new Message({
      senderId: paramsId === loggedInUserId ? botId : loggedInUserId,
      receiverId: paramsId === botId ? botId : loggedInUserId,
      text,
    });

    await newMessage.save();

    return res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller.", error);
    return res.status(500).json("Internal Server Error.");
  }
});

export const deleteMessages = asyncHandler(async (req, res) => {
  const userId = req.user._id.toString();
  const testUserId = process.env.TEST_USER_ID;
  console.log("id out:", userId, testUserId);

  if (userId === testUserId) {
    console.log("id in:", userId, testUserId);
    await Message.deleteMany({
      $or: [
        { senderId: testUserId },
        {
          receiverId: testUserId,
        },
      ],
    });
    return res
      .status(200)
      .json({ message: "Test account messages deleted successfully." });
  } else return;
});
