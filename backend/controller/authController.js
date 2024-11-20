import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import asyncHandler from "../middleware/asyncHandler.middleware.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({
    $or: [
      { email: email },
      { name: name }
    ]
  });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({ name, email, password });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict", 
    maxAge: 3600000, 
  });
  user.password = undefined;
  res.status(201).json({ user, message: "User created successfully" });
});



export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email
  });
  if (user && (await user.comparePassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
    });

    user.password=undefined;
    res.status(200).json({
     user,
     message:"User logdin sucessfully"
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});


export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  res.json({ message: "Logged out successfully" });
});
