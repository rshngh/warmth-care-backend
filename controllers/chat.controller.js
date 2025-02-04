import expressAsyncHandler from "express-async-handler";

export const fetchChat = expressAsyncHandler(async (req, res) => {
  const { userID } = req.body;

  if (!userID) {
    return res.status(400).json("Id not provided.");
  }

  res.status(200).json("Fetching Chats");
});
