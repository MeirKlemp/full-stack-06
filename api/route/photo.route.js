import express from "express";
import {
  getPhotos,
  createPhoto,
  getPhoto,
  deletePhoto,
  updatePhoto,
} from "../controller/photo.controller.js";

import { authenticate } from "../controller/apikey.controller.js";

const photoRoutes = express.Router();

photoRoutes.use(authenticate);

photoRoutes.route("/").get(getPhotos).post(createPhoto);

photoRoutes.route("/:id").get(getPhoto).put(updatePhoto).delete(deletePhoto);

export default photoRoutes;
