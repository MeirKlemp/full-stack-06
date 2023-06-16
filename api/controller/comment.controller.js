import Joi from "joi";

import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/comment.query.js";
import {
  handleUnauthorized,
  handleInternalError,
  handleBadRequest,
  handleNotFound,
} from "../util/handles.js";
import generateQuery from "../query/queryUtils.js";

const isUserVerified = () => {
  // Return true for now, replace with actual verification logic later
  // Probably need to get cookie apiKey as parameter
  return true;
};

// Expecting to get object of [userId, postId, body]
const commentSchema = Joi.object({
  userId: Joi.number().integer().min(0).required(),
  postId: Joi.number().integer().min(0).required(),
  body: Joi.string().min(1).required(),
});

export const getComments = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching comments...`);

  // Check if the user is verified
  if (!isUserVerified()) {
    return handleUnauthorized(res);
  }

  const postId = req.query.postId;
  const userId = req.query.userId;
  const limit = req.query.limit;
  const page = req.query.page;

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

    if (!results) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "No comments found"
          )
        );
    } else {
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
    }
  });
};

export const createComment = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, creating comment`);

  if (!isUserVerified()) {
    return handleUnauthorized(res);
  }

  // Validate the request body against the defined schema
  const { error, value } = commentSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  database.query(
    QUERY.CREATE_COMMENT,
    Object.values(value),
    (error, results) => {
      if (error) {
        console.error("Error creating comment:", error.message);
        return handleInternalError(res);
      }

      const commentId = results.insertId;
      const { userId, postId, body } = req.body;

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

  if (!isUserVerified()) {
    return handleUnauthorized(res);
  }

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

  if (!isUserVerified()) {
    return handleUnauthorized(res);
  }

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

    database.query(
      QUERY.UPDATE_COMMENT,
      [req.body.postId, req.body.body, req.params.id, req.body.userId],
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
              { id: req.params.id, ...req.body }
            )
          );
      }
    );
  });
};

export const deleteComment = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, deleting comment`);

  if (!isUserVerified()) {
    return handleUnauthorized(res);
  }

  database.query(
    QUERY.DELETE_COMMENT,
    [req.params.id, req.body.userId],
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
