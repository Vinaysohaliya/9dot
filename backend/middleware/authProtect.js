import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.middleware.js";
import User from '../models/User.model.js'
const protect = asyncHandler(async (req, res, next) => {

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
});

export default protect;
