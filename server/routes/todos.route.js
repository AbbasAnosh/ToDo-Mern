import express from "express";
const router = express.Router();

import {
  GetTodo,
  PostTodo,
  PutTodo,
  PatchTodo,
  DeleteTodo,
  Gettod,
} from "../controller/todo.controller.js";
router.get("/", GetTodo);
router.get("/:id", Gettod);
router.post("/", PostTodo);
router.put("/:id", PutTodo);
router.patch("/:id", PatchTodo);
router.delete("/:id", DeleteTodo);

export default router;
