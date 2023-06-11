import Joi from "joi";
import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/apikey.query.js";

const loginScheme = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
});

export const createApiKey = (req, res) => {
  const { error, value } = loginScheme.validate(req.body);
  if (error) {
    // TODO: Handle error.
    throw error;
  }

  database.query(
    QUERY.SELECT_USERID_WITH_PASSWORD,
    [value.username, value.password],
    (error, results) => {
      if (error) {
        // TODO: Handle error.
        throw error;
      }

      if (!results.length) {
        // TODO: Handle failed login.
        return res.status(404).send("Wrong username or password!");
      }

      // Create a new apikey.
      const { userId } = results[0];
      database.query(QUERY.CREATE_APIKEY, [userId], (error, results) => {
        if (error) {
          //TODO: Handle error.
          throw error;
        }

        database.query(QUERY.SELECT_APIKEYS, [userId], (error, results) => {
          if (error) {
            //TODO: Handle error.
            throw error;
          }

          // Send the latest api key.
          const { apiKey, created_at } = results[results.length - 1];
          res
            .status(HttpStatus.CREATED.code)
            .send(
              new Response(
                HttpStatus.CREATED.code,
                HttpStatus.CREATED.status,
                `ApiKey created`,
                { apiKey, created_at }
              )
            );
        });
      });
    }
  );
};
