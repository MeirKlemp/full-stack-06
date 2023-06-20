import Joi from "joi";

import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/photo.query.js";
import {
  handleInternalError,
  handleBadRequest,
  handleNotFound,
} from "../util/handles.js";
import generateQuery from "../query/queryUtils.js";

const photoSchema = Joi.object({
  albumId: Joi.number().integer().required(),
  title: Joi.string().min(1).required(),
  url: Joi.string().required(),
  thumbnailUrl: Joi.string().required(),
});

export const getPhotos = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching photos...`);

  const { limit, page } = req.query;
  const { albumId } = req.params;

  const conditions = [];

  const query = generateQuery(QUERY.SELECT_PHOTOS, conditions, limit, page);

  database.query(query, [albumId], (error, results) => {
    if (error) {
      console.error("Error getting photos:", error.message);
      return handleInternalError(res);
    }

    if (!results || results.length === 0) {
      return res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "No photos found"
          )
        );
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "Photos retrieved",
          { photos: results }
        )
      );
  });
};

export const createPhoto = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, creating photo`);

  const { error } = photoSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  const { albumId, title, url, thumbnailUrl } = req.body;

  database.query(
    QUERY.CREATE_PHOTO,
    [albumId, title, url, thumbnailUrl],
    (error, results) => {
      if (error) {
        console.error("Error creating photo:", error.message);
        return handleInternalError(res);
      }

      const photoId = results.insertId;

      const photo = {
        id: photoId,
        albumId,
        title,
        url,
        thumbnailUrl,
      };

      res
        .status(HttpStatus.CREATED.code)
        .send(
          new Response(
            HttpStatus.CREATED.code,
            HttpStatus.CREATED.status,
            "Photo created",
            { photo }
          )
        );
    }
  );
};

export const getPhoto = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching photo`);

  const { albumId, id } = req.params;

  database.query(QUERY.SELECT_PHOTO, [id, albumId], (error, results) => {
    if (error) {
      console.error("Error getting photo:", error.message);
      return handleInternalError(res);
    }

    if (!results[0]) {
      const message = `Photo by id ${id} was not found`;
      return handleNotFound(res, message);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "Photo retrieved",
          results[0]
        )
      );
  });
};

export const updatePhoto = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, updating photo`);

  const { error } = photoSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  const { albumId, id } = req.params;
  const { title, url, thumbnailUrl } = req.body;

  database.query(QUERY.SELECT_PHOTO, [id, albumId], (error, results) => {
    if (error) {
      console.error("Error getting photo:", error.message);
      return handleInternalError(res, error);
    }

    if (!results[0]) {
      return handleNotFound(res, `Photo by id ${id} was not found`);
    }

    database.query(
      QUERY.UPDATE_PHOTO,
      [title, url, thumbnailUrl, id, albumId],
      (error, results) => {
        if (error) {
          console.error("Error updating photo:", error.message);
          return handleInternalError(res, error);
        }

        if (results.affectedRows === 0) {
          return handleNotFound(res, `Photo by id ${id} was not found`);
        }

        res
          .status(HttpStatus.OK.code)
          .send(
            new Response(
              HttpStatus.OK.code,
              HttpStatus.OK.status,
              "Photo updated",
              { id, albumId, title, url, thumbnailUrl }
            )
          );
      }
    );
  });
};

export const deletePhoto = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, deleting photo`);

  const { albumId, id } = req.params;

  database.query(QUERY.DELETE_PHOTO, [id, albumId], (error, results) => {
    if (error) {
      console.error("Error deleting photo:", error.message);
      return handleInternalError(res, error);
    }

    if (results.affectedRows === 0) {
      return handleNotFound(res, `Photo by id ${id} was not found`);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "Photo deleted",
          results[0]
        )
      );
  });
};
