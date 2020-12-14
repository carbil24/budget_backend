import User from "../models/User";

const jwt = require("jsonwebtoken");

export const verifyToken = async (req, res, next) => {
  const token = req.header("x-access-token");

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = decoded._id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "User not found" });

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
