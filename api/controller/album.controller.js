import Joi from "joi";

import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/album.query.js";
import {
  handleInternalError,
  handleBadRequest,
  handleNotFound,
} from "../util/handles.js";
import generateQuery from "../query/queryUtils.js";

const albumSchema = Joi.object({
  title: Joi.string().min(1).required(),
});

export const getAlbums = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching albums...`);

  const { limit, page } = req.query;
  const { userId } = res.locals;

  const conditions = [];

  const query = generateQuery(QUERY.SELECT_ALBUMS, conditions, limit, page);

  database.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error getting albums:", error.message);
      return handleInternalError(res);
    }

    if (!results || results.length === 0) {
      return res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "No albums found"
          )
        );
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "Albums retrieved",
          { albums: results }
        )
      );
  });
};

export const createAlbum = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, creating album`);

  const { error } = albumSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  const { userId } = res.locals;
  const { title } = req.body;

  database.query(QUERY.CREATE_ALBUM, [userId, title], (error, results) => {
    if (error) {
      console.error("Error creating album:", error.message);
      return handleInternalError(res);
    }

    const albumId = results.insertId;

    const album = {
      id: albumId,
      userId,
      title,
    };

    res
      .status(HttpStatus.CREATED.code)
      .send(
        new Response(
          HttpStatus.CREATED.code,
          HttpStatus.CREATED.status,
          "Album created",
          { album }
        )
      );
  });
};

export const getAlbum = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching album`);
  const { userId } = res.locals;

  database.query(
    QUERY.SELECT_ALBUM,
    [req.params.id, userId],
    (error, results) => {
      if (error) {
        console.error("Error getting album:", error.message);
        return handleInternalError(res);
      }

      if (!results[0]) {
        const message = `Album by id ${req.params.id} was not found`;
        return handleNotFound(res, message);
      }

      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "Album retrieved",
            results[0]
          )
        );
    }
  );
};

export const updateAlbum = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, updating album`);
  const { userId } = res.locals;

  const { error } = albumSchema.validate(req.body);
  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  database.query(
    QUERY.SELECT_ALBUM,
    [req.params.id, userId],
    (error, results) => {
      if (error) {
        console.error("Error getting album:", error.message);
        return handleInternalError(res, error);
      }

      if (!results[0]) {
        return handleNotFound(
          res,
          `Album by id ${req.params.id} was not found`
        );
      }

      const { id } = req.params;
      const { title } = req.body;

      database.query(
        QUERY.UPDATE_ALBUM,
        [title, id, userId],
        (error, results) => {
          if (error) {
            console.error("Error updating album:", error.message);
            return handleInternalError(res, error);
          }

          if (results.affectedRows === 0) {
            return handleNotFound(
              res,
              `Album by id ${req.params.id} was not found`
            );
          }

          res
            .status(HttpStatus.OK.code)
            .send(
              new Response(
                HttpStatus.OK.code,
                HttpStatus.OK.status,
                "Album updated",
                { id, userId, title }
              )
            );
        }
      );
    }
  );
};

export const deleteAlbum = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, deleting album`);

  const { userId } = res.locals;

  database.query(
    QUERY.DELETE_ALBUM,
    [req.params.id, userId],
    (error, results) => {
      if (error) {
        console.error("Error deleting album:", error.message);
        return handleInternalError(res, error);
      }

      if (results.affectedRows === 0) {
        return handleNotFound(
          res,
          `Album by id ${req.params.id} was not found`
        );
      }

      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "Album deleted",
            results[0]
          )
        );
    }
  );
};
