import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/post.query.js";

const isUserVerified = () => {
  // Return true for now, replace with actual verification logic later
  // Probably need to get cookie apiKey as parameter
  return true;
};

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

export const getPosts = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching posts...`);

  // Check if the user is verified
  if (!isUserVerified()) {
    handleUnauthorized(res);
    return; // Exit the function after sending the response
  }

  database.query(QUERY.SELECT_POSTS, (error, results) => {
    if (error) {
      // Handle the database error
      console.error("Error connecting to the database: ", error);
      handleDatabaseError(res);
      return; // Exit the function after sending the response
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
/*
export const createPatient = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating patient`);
  database.query(
    QUERY.CREATE_PATIENT_PROCEDURE,
    Object.values(req.body),
    (error, results) => {
      if (!results) {
        logger.error(error.message);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              HttpStatus.INTERNAL_SERVER_ERROR.code,
              HttpStatus.INTERNAL_SERVER_ERROR.status,
              `Error occurred`
            )
          );
      } else {
        //const patient = { id: results.insertedId, ...req.body, created_at: new Date() };
        const patient = results[0][0];
        res
          .status(HttpStatus.CREATED.code)
          .send(
            new Response(
              HttpStatus.CREATED.code,
              HttpStatus.CREATED.status,
              `Patient created`,
              { patient }
            )
          );
      }
    }
  );
};

export const getPatient = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching patient`);
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Patient by id ${req.params.id} was not found`
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Patient retrieved`,
            results[0]
          )
        );
    }
  });
};

export const updatePatient = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching patient`);
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Patient by id ${req.params.id} was not found`
          )
        );
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating patient`);
      database.query(
        QUERY.UPDATE_PATIENT,
        [...Object.values(req.body), req.params.id],
        (error, results) => {
          if (!error) {
            res
              .status(HttpStatus.OK.code)
              .send(
                new Response(
                  HttpStatus.OK.code,
                  HttpStatus.OK.status,
                  `Patient updated`,
                  { id: req.params.id, ...req.body }
                )
              );
          } else {
            logger.error(error.message);
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
              .send(
                new Response(
                  HttpStatus.INTERNAL_SERVER_ERROR.code,
                  HttpStatus.INTERNAL_SERVER_ERROR.status,
                  `Error occurred`
                )
              );
          }
        }
      );
    }
  });
};

export const deletePatient = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting patient`);
  database.query(QUERY.DELETE_PATIENT, [req.params.id], (error, results) => {
    if (results.affectedRows > 0) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Patient deleted`,
            results[0]
          )
        );
    } else {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Patient by id ${req.params.id} was not found`
          )
        );
    }
  });
};
*/