import generateToken from "../config/generateToken.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";

const cookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "strict",
  secure: true,
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("Please enter all the fields.");
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      avatar,
    });

    if (newUser) {
      const token = generateToken(newUser._id, res);

      return res.cookie("jwt", token, cookieOptions).status(201).json({
        message: "User created successfully.",
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data." });
    }
  } catch (error) {
    console.log("Error in SignUp controller.", error);
    return res.status(500).json({ message: "Error creating user." });
  }
});

export const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json("Please provide email and password.");
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "User does not exist." });
    }

    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password incorrect." });
    }

    const token = generateToken(user._id);

    res.cookie("jwt", token, cookieOptions).status(201).json({
      message: "Login successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: token,
    });
  } catch (error) {
    console.log("Error in LogIn controller.", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

export const logOut = asyncHandler(async (req, res) => {
  console.log("log out resource requested.");

  return res
    .clearCookie("jwt", cookieOptions)
    .status(200)
    .json({ message: "Logged out successfully." });
});

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
