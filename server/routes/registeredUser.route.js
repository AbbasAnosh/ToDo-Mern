import express from "express";
import { getRegisteredUser } from "../controller/registereduser.controller.js";

const router = express.Router();

router.get("/", getRegisteredUser);

export default router;
