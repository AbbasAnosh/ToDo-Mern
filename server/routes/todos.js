import todoModel from "../model/todo.js";
import express from "express";
const router = express.Router();
import Joi from "joi";
import auth from "../middleware/auth.js";
router.get("/", auth, async (req, res) => {
  try {
    const todos = await todoModel.find().sort({ date: -1 });
    res.send(todos);
    console.log(req.user);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(300).required(),
    author: Joi.string().min(2).max(40),
    id: Joi.string(),
    completed: Joi.boolean(),
    date: Joi.date(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, author, id, completed, date } = req.body;

  //creating a new document from the request body
  let newTodo = new todoModel({
    name,
    author,
    id,
    completed,
    date,
  });
  //saving the new document to the database & sending it back to the client
  try {
    newTodo = await newTodo.save();
    res.send(newTodo);
    console.log("todo added successfully");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(300).required(),
    author: Joi.string().min(2).max(40),
    id: Joi.string(),
    completed: Joi.boolean(),
    date: Joi.date(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const todo = await todoModel.findById(req.params.id);
    if (!todo) return res.status(404).send("todo not found)");
    const { name, author, id, completed, date } = req.body;

    const updatedTodo = await todoModel.findByIdAndUpdate(
      req.params.id,
      { name, author, id, completed, date },
      {
        new: true,
      }
    );
    res.send(updatedTodo);
    console.log("todo updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const todo = await todoModel.findById(req.params.id);
    if (!todo) return res.status(404).send("todo not found)");

    const todoPatched = await todoModel.findByIdAndUpdate(req.params.id, {
      completed: !todo.completed,
    });
    res.send(todoPatched);
    console.log("todo patched successfully");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  /* delteOne() 
    deleteMany()
    findByIdAndDeleted()
    */
  //1.  const todos = await todoModel.deleteOne({ completed: true })
  // res.send(todos);

  //2. const todos = await todoModel.deleteMany({ completed: true })
  // res.send(todos);
  try {
    const todo = await todoModel.findById(req.params.id);
    if (!todo) return res.status(404).send("todo not found)");
    const deletedTodos = await todoModel.findByIdAndDelete(req.params.id);
    res.send(deletedTodos);
    console.log("todo deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

export default router;
