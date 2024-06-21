import express from "express";
import {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updatedTodo,
} from "../controller/todo.js";

const router = express();

router.get("/", getTodos);

router.get("/:id", getTodo);

router.post("/", createTodo);

router.delete("/:id", deleteTodo);

router.patch("/:id", updatedTodo);

export default router;
