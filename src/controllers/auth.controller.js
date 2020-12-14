import User from "../models/User";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, roles } = req.body;

  //Create a new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: await User.encryptPassword(password),
  });

  const savedUser = await newUser.save();

  //Create and assign a token
  const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET, {
    expiresIn: 86400,
  });

  res.header("x-access-token", token).status(200).json({ token });
  // res.send({ user: savedUser._id });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  //Check if email exists
  const userFound = await User.findOne({ email }).populate("roles");
  if (!userFound) {
    return res.status(400).json({ message: "Email or password are invalid" });
  }

  //Password is correct
  const validPassword = await User.comparePassword(
    password,
    userFound.password
  );
  if (!validPassword) {
    return res.status(401).json({ message: "Email or password are invalid" });
  }

  console.log(userFound);

  //Create and assign a token
  const token = jwt.sign({ _id: userFound._id }, process.env.TOKEN_SECRET, {
    expiresIn: 86400,
  });

  res.header("x-access-token", token).status(200).json({ token });
};
