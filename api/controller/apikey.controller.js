import Joi from "joi";
import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/apikey.query.js";
import {
  handleNotFound,
  handleUnauthorized,
  handleInternalError,
} from "../util/handles.js";

const loginScheme = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
});

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.toLowerCase().startsWith("apikey ")) {
    return handleUnauthorized(res);
  }
  const apikey = authHeader.split(" ")[1];
  database.query(QUERY.SELECT_APIKEY, [apikey], (error, results) => {
    if (error) {
      return handleInternalError(res);
    }

    if (!results.length) {
      return handleUnauthorized(res);
    }

    res.locals.userId = results[0].userId;
    res.locals.apiKey = results[0].apiKey;
    next();
  });
};

export const createApiKey = (req, res) => {
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
      database.query(QUERY.CREATE_APIKEY, [userId], (error, results) => {
        if (error) {
          return handleInternalError(res);
        }

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
                { apiKey, created_at }
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
