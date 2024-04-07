import express from "express";
const router = express.Router();
import { SignIn } from "../controller/signIn.controller.js";

router.post("/", SignIn);

export default router;
