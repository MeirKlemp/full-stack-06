import express from "express";
import {
  getUser,
  createUser,
  deleteUser,
  //  updateUser,
} from "../controller/user.controller.js";

import { authenticate } from "../controller/apikey.controller.js";

const userRoutes = express.Router();

userRoutes.post("/", createUser);

userRoutes.use(authenticate);

userRoutes.route("/:id").get(getUser); //.put(updateUser);
userRoutes.delete("/", deleteUser);

export default userRoutes;
