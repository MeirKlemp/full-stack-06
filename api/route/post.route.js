import express from "express";
import { getPosts } from "../controller/post.controller.js";
/*import {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
} from "../controller/post.controller.js";*/

const postRoutes = express.Router();

//postRoutes.route("/").get(getPosts).post(createPost);
postRoutes.route("/").get(getPosts);

/*
postRoutes
  .route("/:id")
  .get(getPost)
  .put(updatePost)
  .delete(deletePost);
  */

export default postRoutes;
