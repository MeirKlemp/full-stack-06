import Joi from "joi";
import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/apikey.query.js";
import {
  handleBadRequest,
  handleUnauthorized,
  handleNotFound,
  handleInternalError,
} from "../util/handles.js";

const loginScheme = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
});

export const authenticate = (req, res, next) => {
  console.log("User try to authenticate");
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.toLowerCase().startsWith("apikey ")) {
    console.log("No proper authorization header or bad value");
    return handleUnauthorized(res);
  }
  const apikey = authHeader.split(" ")[1];
  database.query(QUERY.SELECT_APIKEY, [apikey], (error, results) => {
    if (error) {
      return handleInternalError(res);
    }

    if (!results.length) {
      console.log("User was not authorized");
      return handleUnauthorized(res);
    }

    res.locals.userId = results[0].userId;
    res.locals.apiKey = results[0].apiKey;
    console.log("Authorized user with id: " + results[0].userId);
    next();
  });
};

export const createApiKey = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, creating apikey...`);

  const { error, value } = loginScheme.validate(req.body);
  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  database.query(
    QUERY.SELECT_USERID_WITH_PASSWORD,
    [value.username, value.password],
    (error, results) => {
      if (error) {
        return handleInternalError(res);
      }

      if (!results.length) {
        return handleNotFound(res, "Wrong username or password!");
      }

      // Create a new apikey.
      const { userId } = results[0];
      console.log("Trying to create API key...");
      database.query(QUERY.CREATE_APIKEY, [userId], (error, results) => {
        if (error) {
          console.log(error.message);
          return handleInternalError(res);
        }

        console.log("Trying to return API key...");
        database.query(QUERY.SELECT_APIKEYS, [userId], (error, results) => {
          if (error) {
            return handleInternalError(res);
          }

          // Send the latest api key.
          const { apiKey, created_at } = results[results.length - 1];
          res
            .status(HttpStatus.CREATED.code)
            .send(
              new Response(
                HttpStatus.CREATED.code,
                HttpStatus.CREATED.status,
                "ApiKey created",
                { apiKey, userId, created_at }
              )
            );
        });
      });
    }
  );
};

export const deleteApiKeys = (req, res) => {
  const { userId } = res.locals;
  database.query(QUERY.DELETE_APIKEYS, [userId], (error, results) => {
    if (error) {
      return handleInternalError(res);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "All ApiKeys deleted"
        )
      );
  });
};

export const deleteApiKey = (req, res) => {
  const { apiKey } = req.params;
  database.query(QUERY.DELETE_APIKEY, [apiKey], (error, results) => {
    if (error) {
      return handleInternalError(res);
    }

    if (!results.affectedRows) {
      return handleNotFound(res, "ApiKey not found");
    }
    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, "ApiKey deleted")
      );
  });
};
