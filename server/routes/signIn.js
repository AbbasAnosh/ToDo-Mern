import Joi from "joi";
import express from "express";
import bcrypt from "bcryptjs";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(8).max(300).email().required(),
    password: Joi.string().min(8).max(300).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User dosen't exist");
    const validatedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatedPassword) return res.status(400).send("Invalid password");
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      secretKey
    );
    res.send({ token });
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
});

export default router;
