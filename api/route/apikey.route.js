import express from "express";
import {
  authenticate,
  createApiKey,
  deleteApiKeys,
  deleteApiKey,
} from "../controller/apikey.controller.js";

const apikeyRoutes = express.Router();

apikeyRoutes.post("/", createApiKey);

apikeyRoutes.use(authenticate);
apikeyRoutes.delete("/", deleteApiKeys);
apikeyRoutes.delete("/:apiKey", deleteApiKey);

export default apikeyRoutes;
