import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  GetTodo,
  PostTodo,
  PutTodo,
  PatchTodo,
  DeleteTodo,
} from "../controller/todo.controller.js";
router.get("/", auth, GetTodo);
router.post("/", PostTodo);
router.put("/:id", PutTodo);
router.patch("/:id", PatchTodo);
router.delete("/:id", DeleteTodo);

export default router;
