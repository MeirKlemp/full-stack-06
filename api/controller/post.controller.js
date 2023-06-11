import Joi from "joi";

import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/post.query.js";
import {
  handleUnauthorized,
  handleInternalError,
  handleBadRequest,
  handleNotFound,
} from "../util/handles.js";

const isUserVerified = () => {
  // Return true for now, replace with actual verification logic later
  // Probably need to get cookie apiKey as parameter
  return true;
};

// Expecting to get object of [userId, title, body]
const postSchema = Joi.object({
  userId: Joi.number().integer().min(0).required(),
  title: Joi.string().min(1).required(),
  body: Joi.string().min(1).required(),
});

export const getPosts = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching posts...`);

  // Check if the user is verified
  if (!isUserVerified()) {
    return handleUnauthorized(res);
  }

  database.query(QUERY.SELECT_POSTS, (error, results) => {
    if (error) {
      console.error("Error getting posts:", error.message);
      return handleInternalError(res);
    }

    if (!results) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "No posts found"
          )
        );
    } else {
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
    }
  });
};

export const createPost = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, creating post`);

  if (!isUserVerified()) {
    return handleUnauthorized(res);
  }

  // Validate the request body against the defined schema
  const { error, value } = postSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  database.query(QUERY.CREATE_POST, Object.values(value), (error, results) => {
    if (error) {
      console.error("Error creating post:", error.message);
      return handleInternalError(res);
    }

    const postId = results.insertId;
    const { userId, title, body } = req.body;

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

  if (!isUserVerified()) {
    return handleUnauthorized(res);
  }

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

  if (!isUserVerified()) {
    return handleUnauthorized(res);
  }

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

    database.query(
      QUERY.UPDATE_POST,
      [req.body.title, req.body.body, req.params.id, req.body.userId],
      (error, results) => {
        if (error) {
          console.error("Error updating post:", error.message);
          return handleInternalError(res, error);
        }

        if (results.affectedRows === 0) {
          return handleNotFound(res, `Post by id ${req.params.id} was not found`); // TODO change it to unauthorized later maybe
        }
    
        res
          .status(HttpStatus.OK.code)
          .send(
            new Response(
              HttpStatus.OK.code,
              HttpStatus.OK.status,
              `Post updated`,
              { id: req.params.id, ...req.body }
            )
          );
      }
    );
  });
};

export const deletePost = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, deleting post`);

  if (!isUserVerified()) {
    return handleUnauthorized(res);
  }

  database.query(QUERY.DELETE_POST, [req.params.id, req.body.userId], (error, results) => {
    if (error) {
      console.error("Error deleting post:", error.message);
      return handleInternalError(res, error);
    }

    if (results.affectedRows === 0) {
      return handleNotFound(res, `Post by id ${req.params.id} was not found`);
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
  });
};
