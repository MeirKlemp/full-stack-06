import Joi from "joi";

import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/comment.query.js";
import {
  handleInternalError,
  handleBadRequest,
  handleNotFound,
} from "../util/handles.js";
import generateQuery from "../query/queryUtils.js";

// Expecting to get object of [userId, postId, body]
const commentSchema = Joi.object({
  postId: Joi.number().integer().min(0).required(),
  body: Joi.string().min(1).required(),
});

export const getComments = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching comments...`);

  const { postId, userId, limit, page } = req.query;

  const conditions = [];

  if (postId) {
    conditions.push(`postId=${postId}`);
  }

  if (userId) {
    conditions.push(`userId=${userId}`);
  }

  const query = generateQuery(QUERY.SELECT_COMMENTS, conditions, limit, page);

  database.query(query, (error, results) => {
    if (error) {
      console.error("Error getting comments:", error.message);
      return handleInternalError(res);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "Comments retrieved",
          { comments: results }
        )
      );
  });
};

export const createComment = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, creating comment`);

  // Validate the request body against the defined schema
  const { error } = commentSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  const { userId } = res.locals;
  const { postId, body } = req.body;

  database.query(
    QUERY.CREATE_COMMENT,
    [userId, postId, body],
    (error, results) => {
      if (error) {
        console.error("Error creating comment:", error.message);
        return handleInternalError(res);
      }

      const commentId = results.insertId;

      const comment = {
        id: commentId,
        userId,
        postId,
        body,
      };

      res
        .status(HttpStatus.CREATED.code)
        .send(
          new Response(
            HttpStatus.CREATED.code,
            HttpStatus.CREATED.status,
            `Comment created`,
            { comment }
          )
        );
    }
  );
};

export const getComment = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching comment`);

  database.query(QUERY.SELECT_COMMENT, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error getting comment:", error.message);
      return handleInternalError(res);
    }

    if (!results[0]) {
      const message = `Comment by id ${req.params.id} was not found`;
      return handleNotFound(res, message);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          `Comment retrieved`,
          results[0]
        )
      );
  });
};

export const updateComment = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching comment`);

  const { error } = commentSchema.validate(req.body);
  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  database.query(QUERY.SELECT_COMMENT, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error getting comment:", error.message);
      return handleInternalError(res, error);
    }

    if (!results[0]) {
      return handleNotFound(
        res,
        `Comment by id ${req.params.id} was not found`
      );
    }

    console.log(`${req.method} ${req.originalUrl}, updating comment`);

    const { id } = req.params;
    const { userId } = res.locals;
    const { postId, body } = req.body;

    database.query(
      QUERY.UPDATE_COMMENT,
      [postId, body, id, userId],
      (error, results) => {
        if (error) {
          console.error("Error updating comment:", error.message);
          return handleInternalError(res, error);
        }

        if (results.affectedRows === 0) {
          return handleNotFound(
            res,
            `Comment by id ${req.params.id} was not found`
          ); // TODO change it to unauthorized later maybe
        }

        res
          .status(HttpStatus.OK.code)
          .send(
            new Response(
              HttpStatus.OK.code,
              HttpStatus.OK.status,
              `Comment updated`,
              { id: req.params.id, userId: userId, ...req.body }
            )
          );
      }
    );
  });
};

export const deleteComment = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, deleting comment`);

  const { userId } = res.locals;

  database.query(
    QUERY.DELETE_COMMENT,
    [req.params.id, userId],
    (error, results) => {
      if (error) {
        console.error("Error deleting comment:", error.message);
        return handleInternalError(res, error);
      }

      if (results.affectedRows === 0) {
        return handleNotFound(
          res,
          `Comment by id ${req.params.id} was not found`
        );
        // Or unauthorized
      }

      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Comment deleted`,
            results[0]
          )
        );
    }
  );
};
