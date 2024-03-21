import Joi from "joi";
import express from "express";
const router = express.Router();
import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    email: Joi.string().min(8).max(300).email().required(),
    password: Joi.string().min(8).max(300).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists");
    const { name, email, password } = req.body;
    let newUser = new userModel({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    res.send("user created");
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
});

export default router;
