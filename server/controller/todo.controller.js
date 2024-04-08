import todoModel from "../model/todo.js";
import Joi from "joi";

export const GetTodo = async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 3;

    const totalTodos = await todoModel.countDocuments();
    const totalPages = Math.ceil(totalTodos / limit);

    const todos = await todoModel
      .find()
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      todos,
      totalPages,
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const Gettod = async (req, res) => {
  try {
    const todos = await todoModel.findById();
    res.send(todos);
    console.log(req.user);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const PostTodo = async (req, res) => {
  const schema = Joi.object({
    id: Joi.string(),
    name: Joi.string().min(2).max(300).required(),
    description: Joi.string().min(10).max(500).required(),
    author: Joi.string().min(2).max(40),
    completed: Joi.boolean(),
    date: Joi.date(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, description, author, id, completed, date } = req.body;

  let newTodo = new todoModel({
    name,
    description,
    author,
    id,
    completed,
    date,
  });
  try {
    newTodo = await newTodo.save();
    res.send(newTodo);
    console.log("todo added successfully");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const PutTodo = async (req, res) => {
  console.log(req.body, "afdsfsafds");
  const schema = Joi.object({
    name: Joi.string().allow(""),
    description: Joi.string().allow(""),
    author: Joi.string().allow(""),
    id: Joi.string(),
    completed: Joi.boolean(),
    date: Joi.date(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const todo = await todoModel.findById(req.params.id);
    if (!todo) return res.status(404).send("todo not found)");
    const { name, description, author, id, completed, date } = req.body;

    const updatedTodo = await todoModel.findByIdAndUpdate(
      req.params.id,
      { name, description, author, id, completed, date },
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
};

export const PutCompleted = async (req, res) => {
  console.log(req.body, "fasfsdfdsf");
  const schema = Joi.object({
    completed: Joi.boolean().required(),
    name: Joi.string(),
    description: Joi.string(),
    author: Joi.string(),
    id: Joi.string(),
    date: Joi.date(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const todo = await todoModel.findById(req.params.id);
    if (!todo) return res.status(404).send("todo not found");
    const { name, description, author, id, completed, date } = req.body;

    const updatedCompleted = await todoModel.findByIdAndUpdate(
      req.params.id,
      { description, name, author, id, completed, date },
      { new: true }
    );
    res.send(updatedCompleted);
    console.log("todo updatedCompleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const PatchTodo = async (req, res) => {
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
};

export const DeleteTodo = async (req, res) => {
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
};
