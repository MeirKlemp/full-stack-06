import HttpStatus from "./http-status.js";
import Response from "./response.js";

export const handleUnauthorized = (res) => {
  res
    .status(HttpStatus.UNAUTHORIZED.code)
    .append("WWW-Authenticate", "ApiKey")
    .send(
      new Response(
        HttpStatus.UNAUTHORIZED.code,
        HttpStatus.UNAUTHORIZED.status,
        "Unauthorized"
      )
    );
};

export const handleInternalError = (res) => {
  res
    .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
    .send(
      new Response(
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status,
        "There was some internal error"
      )
    );
};

export const handleBadRequest = (res, message) => {
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

export const handleNotFound = (res, message) => {
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
