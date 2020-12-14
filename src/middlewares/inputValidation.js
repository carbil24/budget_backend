import Joi from "@hapi/joi";
import User from "../models/User";

//Register validation
export const register = async (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //Check if user is already in the database
  const { email } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists)
    return res.status(400).json({ message: "Email already exists" });

  next();
  return;
};

//Login validation
export const login = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
  return;
};

//Create member validation
export const member = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
  return;
};
