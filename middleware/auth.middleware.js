import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  //verfication using cookies

  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized request- No token provided." });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res
          .status(401)
          .json({ message: "Invalid token- Invalid token." });
      }

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: "User not found." });
      }

      req.user = user;

      next();
    } catch (error) {
      console.log("Error in AuthMiddleware controller.");
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }

  /*  
 //verfication using header
 if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("User authorized.");
      next();
      //start by finding user using token
    } catch (error) {
      console.log("Not authorized, token invalid.", error);
      res.status(402).json("Not authorized, token invalid.");
    }
  } else {
    res.status(401).json("Invalid request.");
    throw new Error("Invalid request.");
  } */
});
