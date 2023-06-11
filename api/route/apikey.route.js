import express from "express";
import { createApiKey } from "../controller/apikey.controller.js";

const apikeyRoutes = express.Router();

apikeyRoutes.route("/").post(createApiKey);

export default apikeyRoutes;
