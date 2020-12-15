import User from "../models/User";

export const getUser = async (req, res) => {
  // const users = await User.find().populate("roles");
  // res.status(200).json(users);
  const user = await User.findById(req.userId, { password: 0 });
  return res.json(user);
};
