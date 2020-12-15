import User from "../models/User";
import jwt from "jsonwebtoken";
import Member from "../models/Member";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //Create a new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: await User.encryptPassword(password),
  });

  const savedUser = await newUser.save();

  const member = await Member.findOne({ email: savedUser.email });

  if (member) {
    await member.update({
      name: `${savedUser.firstName} ${savedUser.lastName}`,
    });
  } else {
    await Member.create({
      email: savedUser.email,
      name: `${savedUser.firstName} ${savedUser.lastName}`,
    });
  }

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
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Email or password are invalid" });
  }

  //Password is correct
  const validPassword = await User.comparePassword(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Email or password are invalid" });
  }

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: 86400,
  });

  res.header("x-access-token", token).status(200).json({ token, user });
};

export const verifyToken = async (req, res) => {
  const token = req.header("x-access-token");

  if (!token) return res.json(false);

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified._id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.json(false);
  }
};
