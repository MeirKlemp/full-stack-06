import express from "express";
import {
  getUser,
  createUser,
  deleteUserSelf,
  updateUserSelf,
} from "../controller/user.controller.js";

import { authenticate } from "../controller/apikey.controller.js";

const userRoutes = express.Router();

userRoutes.post("/", createUser);

userRoutes.use(authenticate);

userRoutes.get("/:id", getUser);
userRoutes.route("/").delete(deleteUserSelf).put(updateUserSelf);

export default userRoutes;
