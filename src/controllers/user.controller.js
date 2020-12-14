import User from "../models/User";

export const getUsers = async (req, res) => {
  const users = await User.find().populate("roles");
  res.status(200).json(users);
};
