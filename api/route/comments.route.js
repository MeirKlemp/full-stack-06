import express from "express";
import {
  getComments,
  createComment,
  getComment,
  deleteComment,
  updateComment,
} from "../controller/comment.controller.js";

import { authenticate } from "../controller/apikey.controller.js";

const commentRoutes = express.Router();

commentRoutes.use(authenticate);

commentRoutes.route("/").get(getComments).post(createComment);

commentRoutes
  .route("/:id")
  .get(getComment)
  .put(updateComment)
  .delete(deleteComment);

export default commentRoutes;
