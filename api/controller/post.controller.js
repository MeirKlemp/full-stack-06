import Joi from "joi";

import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/post.query.js";
import {
  handleInternalError,
  handleBadRequest,
  handleNotFound,
} from "../util/handles.js";
import generateQuery from "../query/queryUtils.js";

// Expecting to get object of [userId, title, body]
const postSchema = Joi.object({
  title: Joi.string().min(1).required(),
  body: Joi.string().min(1).required(),
});

export const getPosts = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching posts...`);

  const { postId, userId, limit, page } = req.query;

  const conditions = [];

  if (postId) {
    conditions.push(`postId=${postId}`);
  }

  if (userId) {
    conditions.push(`userId=${userId}`);
  }

  const query = generateQuery(QUERY.SELECT_POSTS, conditions, limit, page);

  database.query(query, (error, results) => {
    if (error) {
      console.error("Error getting posts:", error.message);
      return handleInternalError(res);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "Posts retrieved",
          { posts: results }
        )
      );
  });
};

export const createPost = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, creating post`);

  // Validate the request body against the defined schema
  const { error } = postSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  const { userId } = res.locals;
  const { title, body } = req.body;

  database.query(QUERY.CREATE_POST, [userId, title, body], (error, results) => {
    if (error) {
      console.error("Error creating post:", error.message);
      return handleInternalError(res);
    }

    const postId = results.insertId;

    const post = {
      id: postId,
      userId,
      title,
      body,
    };

    res
      .status(HttpStatus.CREATED.code)
      .send(
        new Response(
          HttpStatus.CREATED.code,
          HttpStatus.CREATED.status,
          `Post created`,
          { post }
        )
      );
  });
};

export const getPost = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching post`);

  database.query(QUERY.SELECT_POST, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error getting post:", error.message);
      return handleInternalError(res);
    }

    if (!results[0]) {
      const message = `Post by id ${req.params.id} was not found`;
      return handleNotFound(res, message);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          `Post retrieved`,
          results[0]
        )
      );
  });
};

export const updatePost = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching post`);

  const { error } = postSchema.validate(req.body);
  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  database.query(QUERY.SELECT_POST, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error getting post:", error.message);
      return handleInternalError(res, error);
    }

    if (!results[0]) {
      return handleNotFound(res, `Post by id ${req.params.id} was not found`);
    }

    console.log(`${req.method} ${req.originalUrl}, updating post`);

    const { id } = req.params;
    const { userId } = res.locals;
    const { title, body } = req.body;

    database.query(
      QUERY.UPDATE_POST,
      [title, body, id, userId],
      (error, results) => {
        if (error) {
          console.error("Error updating post:", error.message);
          return handleInternalError(res, error);
        }

        if (results.affectedRows === 0) {
          return handleNotFound(
            res,
            `Post by id ${req.params.id} was not found`
          ); // TODO change it to unauthorized later maybe
        }

        res
          .status(HttpStatus.OK.code)
          .send(
            new Response(
              HttpStatus.OK.code,
              HttpStatus.OK.status,
              `Post updated`,
              { id: req.params.id, userId: userId, ...req.body }
            )
          );
      }
    );
  });
};

export const deletePost = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, deleting post`);

  const { userId } = res.locals;
  const postId = req.params.id;

  database.query(QUERY.DELETE_COMMENTS_OF_POST, [postId], (commentError) => {
    if (commentError) {
      console.error("Error deleting comments:", commentError.message);
      return handleInternalError(res, commentError);
    }

    database.query(
      QUERY.DELETE_POST,
      [postId, userId],
      (postError, results) => {
        if (postError) {
          console.error("Error deleting post:", postError.message);
          return handleInternalError(res, postError);
        }

        if (results.affectedRows === 0) {
          return handleNotFound(res, `Post by id ${postId} was not found`);
          // Or unauthorized
        }

        res
          .status(HttpStatus.OK.code)
          .send(
            new Response(
              HttpStatus.OK.code,
              HttpStatus.OK.status,
              `Post deleted`,
              results[0]
            )
          );
      }
    );
  });
};
