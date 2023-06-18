import express from "express";
import {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
} from "../controller/post.controller.js";

import { authenticate } from "../controller/apikey.controller.js";

const postRoutes = express.Router();

postRoutes.use(authenticate);

postRoutes.route("/").get(getPosts).post(createPost);

postRoutes.route("/:id").get(getPost).put(updatePost).delete(deletePost);

export default postRoutes;
