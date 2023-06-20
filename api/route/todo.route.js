import express from "express";
import {
  getTodos,
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo,
} from "../controller/todo.controller.js";

import { authenticate } from "../controller/apikey.controller.js";

const todoRoutes = express.Router();

todoRoutes.use(authenticate);

todoRoutes.route("/").get(getTodos).post(createTodo);

todoRoutes
  .route("/:id")
  .get(getTodo)
  .put(updateTodo)
  .delete(deleteTodo);

export default todoRoutes;
