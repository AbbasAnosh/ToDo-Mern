import express from "express";
const router = express.Router();
import { SignUp } from "../controller/signUp.controller.js";

router.post("/", SignUp);

export default router;
