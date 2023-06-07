import Joi from "joi";

import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/post.query.js";

const isUserVerified = () => {
  // Return true for now, replace with actual verification logic later
  // Probably need to get cookie apiKey as parameter
  return true;
};

// Expecting to get object of [userId, title, body]
const postSchema = Joi.object({
  userId: Joi.number().integer().min(1).required(),
  title: Joi.string().min(1).required(),
  body: Joi.string().min(1).required(),
});

const handleUnauthorized = (res) => {
  res
    .status(HttpStatus.UNAUTHORIZED.code)
    .send(
      new Response(
        HttpStatus.UNAUTHORIZED.code,
        HttpStatus.UNAUTHORIZED.status,
        "Unauthorized"
      )
    );
};

const handleDatabaseError = (res) => {
  res
    .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
    .send(
      new Response(
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status,
        "There were issues connecting to the database"
      )
    );
};

// Function to handle bad request errors
const handleBadRequest = (res, message) => {
  console.log(message);
  res
    .status(HttpStatus.BAD_REQUEST.code)
    .send(
      new Response(
        HttpStatus.BAD_REQUEST.code,
        HttpStatus.BAD_REQUEST.status,
        message
      )
    );
};

const handleNotFound = (res, message) => {
  console.log(message);
  res
    .status(HttpStatus.NOT_FOUND.code)
    .send(
      new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        message
      )
    );
};

export const getPosts = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching posts...`);

  // Check if the user is verified
  if (!isUserVerified()) {
    return handleUnauthorized(res);
  }

  database.query(QUERY.SELECT_POSTS, (error, results) => {
    if (error) {
      console.error("Error getting posts:", error.message);
      return handleDatabaseError(res);
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
      return handleDatabaseError(res);
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
      return handleDatabaseError(res);
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
      return handleDatabaseError(res, error);
    }

    if (!results[0]) {
      return handleNotFound(res, `Post by id ${req.params.id} was not found`);
    }

    console.log(`${req.method} ${req.originalUrl}, updating post`);

    database.query(
      QUERY.UPDATE_POST,
      [req.body.title, req.body.body, req.params.id],
      (error) => {
        if (error) {
          console.error("Error updating post:", error.message);
          return handleDatabaseError(res, error);
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

  database.query(QUERY.DELETE_POST, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error deleting post:", error.message);
      return handleDatabaseError(res, error);
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
