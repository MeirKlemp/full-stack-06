import Joi from "joi";

import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/user.query.js";
import {
  handleInternalError,
  handleBadRequest,
  handleNotFound,
} from "../util/handles.js";

const databasePr = database.promise();

// TODO: Block usernames that start with numbers.
const userCreationSchema = Joi.object({
  name: Joi.string().min(1).required(),
  username: Joi.string().min(1).required(),
  email: Joi.string().min(1).required(),
  password: Joi.string().min(4).required(),
});

export const createUser = async (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, creating user`);

  const { error } = userCreationSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  try {
    const { name, username, email, password } = req.body;

    // Check if a user with the username already exists
    const conflictingUser = await databasePr.query(
      QUERY.SELECT_USER_BY_USERNAME_OR_EMAIL,
      [username, email]
    );
    if (conflictingUser[0].length !== 0) {
      console.error("Found duplicate username:", conflictingUser[0]);
      return res
        .status(HttpStatus.CONFLICT.code)
        .send(
          new Response(
            HttpStatus.CONFLICT.code,
            HttpStatus.CONFLICT.status,
            "A user with the given username or email already exists."
          )
        );
    }

    const userCreation = await databasePr.query(QUERY.CREATE_USER, [
      name,
      username,
      email,
    ]);
    const userId = userCreation[0].insertId;

    const user = {
      id: userId,
      name,
      username,
      email,
    };

    try {
      const passwordCreation = await databasePr.query(QUERY.CREATE_PASSWORD, [
        userId,
        password,
      ]);

      res
        .status(HttpStatus.CREATED.code)
        .send(
          new Response(
            HttpStatus.CREATED.code,
            HttpStatus.CREATED.status,
            `User created`,
            { user }
          )
        );
    } catch (error) {
      // Password creation error.
      // Deleting the created user because the password is missing...
      console.error("Error creating password:", error.message);
      console.error("Trying to delete the created user from the database...");
      await databasePr.query(QUERY.DELETE_USER, [userId]);
      console.error("Successfully deleted the created user.");
      return handleInternalError(res);
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return handleInternalError(res);
  }
};
