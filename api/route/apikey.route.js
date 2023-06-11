import express from "express";
import { authenticate, createApiKey } from "../controller/apikey.controller.js";

const apikeyRoutes = express.Router();

apikeyRoutes.post("/", createApiKey);

apikeyRoutes.use(authenticate);
apikeyRoutes.route("/").get((req, res) => res.status(200).send(res.locals));

export default apikeyRoutes;
