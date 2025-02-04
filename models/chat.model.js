//chatname
//isgroupchat
//users
//latesmsg
//groupadmin

import mongoose from "mongoose";

export const chatSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
