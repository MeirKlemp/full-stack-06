import Joi from "joi";

import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/todo.query.js";
import {
  handleInternalError,
  handleBadRequest,
  handleNotFound,
} from "../util/handles.js";
import generateQuery from "../query/queryUtils.js";

const todoSchema = Joi.object({
  title: Joi.string().min(1).required(),
  completed: Joi.number().integer().valid(0, 1).required(),
});

export const getTodos = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching todos...`);

  const { completed, limit, page } = req.query;
  const { userId } = res.locals;

  const conditions = [];

  if (completed) {
    conditions.push(`completed=${completed}`);
  }

  const query = generateQuery(QUERY.SELECT_TODOS, conditions, limit, page);

  database.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error getting todos:", error.message);
      return handleInternalError(res);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "Todos retrieved",
          { todos: results }
        )
      );
  });
};

export const createTodo = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, creating todo`);

  // Validate the request body against the defined schema
  const { error } = todoSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  const { userId } = res.locals;
  const { title, completed } = req.body;

  database.query(
    QUERY.CREATE_TODO,
    [userId, title, completed],
    (error, results) => {
      if (error) {
        console.error("Error creating todo:", error.message);
        return handleInternalError(res);
      }

      const todoId = results.insertId;

      const todo = {
        id: todoId,
        userId,
        title,
        completed,
      };

      res
        .status(HttpStatus.CREATED.code)
        .send(
          new Response(
            HttpStatus.CREATED.code,
            HttpStatus.CREATED.status,
            `Todo created`,
            { todo }
          )
        );
    }
  );
};

export const getTodo = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching todo`);
  const { userId } = res.locals;

  database.query(
    QUERY.SELECT_TODO,
    [req.params.id, userId],
    (error, results) => {
      if (error) {
        console.error("Error getting todo:", error.message);
        return handleInternalError(res);
      }

      if (!results[0]) {
        const message = `Todo by id ${req.params.id} was not found`;
        return handleNotFound(res, message);
      }

      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Todo retrieved`,
            results[0]
          )
        );
    }
  );
};

export const updateTodo = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching todo`);
  const { userId } = res.locals;

  const { error } = todoSchema.validate(req.body);
  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  database.query(
    QUERY.SELECT_TODO,
    [req.params.id, userId],
    (error, results) => {
      if (error) {
        console.error("Error getting todo:", error.message);
        return handleInternalError(res, error);
      }

      console.log(results[0]);
      console.log(!results[0]);

      if (!results[0]) {
        return handleNotFound(res, `Todo by id ${req.params.id} was not found`);
      }

      console.log(`${req.method} ${req.originalUrl}, updating todo`);

      const { id } = req.params;
      const { title, completed } = req.body;
      console.log(id, title, completed, userId);
      database.query(
        QUERY.UPDATE_TODO,
        [title, completed, id, userId],
        (error, results) => {
          if (error) {
            console.error("Error updating todo:", error.message);
            return handleInternalError(res, error);
          }

          if (results.affectedRows === 0) {
            console.log("Couldn't update todo");
            console.log(results);
            return handleNotFound(
              res,
              `Todo by id ${req.params.id} was not found`
            ); // TODO change it to unauthorized later maybe
          }

          res
            .status(HttpStatus.OK.code)
            .send(
              new Response(
                HttpStatus.OK.code,
                HttpStatus.OK.status,
                `Todo updated`,
                { id: req.params.id, userId: userId, ...req.body }
              )
            );
        }
      );
    }
  );
};

export const deleteTodo = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, deleting todo`);

  const { userId } = res.locals;

  database.query(
    QUERY.DELETE_TODO,
    [req.params.id, userId],
    (error, results) => {
      if (error) {
        console.error("Error deleting todo:", error.message);
        return handleInternalError(res, error);
      }

      if (results.affectedRows === 0) {
        return handleNotFound(res, `Todo by id ${req.params.id} was not found`);
        // Or unauthorized
      }

      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Todo deleted`,
            results[0]
          )
        );
    }
  );
};
