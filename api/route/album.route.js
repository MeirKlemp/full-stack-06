import express from "express";
import {
  getAlbums,
  createAlbum,
  getAlbum,
  deleteAlbum,
  updateAlbum,
} from "../controller/album.controller.js";

import { authenticate } from "../controller/apikey.controller.js";

const albumRoutes = express.Router();

albumRoutes.use(authenticate);

albumRoutes.route("/").get(getAlbums).post(createAlbum);

albumRoutes.route("/:id").get(getAlbum).put(updateAlbum).delete(deleteAlbum);

export default albumRoutes;
