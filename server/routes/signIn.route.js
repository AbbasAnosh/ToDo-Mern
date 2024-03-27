import express from "express";
const router = express.Router();
import { SignIn } from "../controller/signIn.controller.js";

router.post("/signin", SignIn);

export default router;
