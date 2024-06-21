// IMPORT SCHEMA

import mongoose from "mongoose";
import Todo from "../models/todoSchema.js";

// GET ALL TODOS IN THE SERVER AND SORT IS BASED ON THE STARTING DATE

export const getTodos = async (req, res) => {
  const todo = await Todo.find({}).sort({ status: -1, startingDate: 1 });

  res.status(200).json(todo);
};

// GET A SINGLE TODO IN THE SERVER

export const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Todo" });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ error: "No such Todo" });
  }

  res.status(200).json(todo);
};

// SEND A TODO IN THE SERVER

export const createTodo = async (req, res) => {
  const { name, startingDate, dueDate } = req.body;

  try {
    const todo = await Todo.create({ name, startingDate, dueDate });

    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// DELETE A TODO IN THE SERVER

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ error: "No such todo" });
    }

    res.status(200).json({ message: "Todo deleted successfully", id });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// UPDATE A TODO

export const updatedTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Todo" });
  }

  const todo = await Todo.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!todo) {
    return res.status(400).json({ error: "No such todo" });
  }

  res.status(200).json(todo);
};
