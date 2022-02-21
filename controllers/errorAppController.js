import ApplicationError from "../Errors/applicationError.js";

export default function (err, req, res, next) {
  err.statusCode = err.statusCode ? err.statusCode : 500;
  if (err.isOperational) {
    executeOrgError(err, req, res);
  } else if (err.name === "ValidationError") {
    hanleDBValidationError(err, req, res);
  } else if (err.name === "CastError") {
    handleDBcastError(err, req, res);
  } else if (err.code === 11000) {
    handleDBduplicateError(err, req, res);
  } else {
    unOperationalError(err, res);
  }
}

function executeOrganizationError(err, req, res) {
  return res.status(err.statusCode).json({
    "error-message": err.message,
  });
}

function hanleDBValidationError(err, req, res) {
  console.log(Object.values(err.errors));
  const errorMessage = Object.values(err.errors)
    .map((item) => item.message)
    .join(" ");
  const appError = new ApplicationError(400, errorMessage);
  executeOrganizationError(appError, req, res);
}

function handleDBduplicateError(err, req, res) {
  const errorMessage = `The value (${Object.keys(
    err.keyValue
  )}: ${Object.values(
    err.keyValue
  )}) already exists. Please change this field!`;
  const appError = new ApplicationError(400, errorMessage);
  executeOrganizationError(appError, req, res);
}

function handleDBcastError(err, req, res) {
  const errorMessage = `Invalid query value for key ${err.path}`;
  const appError = new ApplicationError(400, errorMessage);
  executeOrganizationError(appError, req, res);
}

function unOperationalError(err, res) {
  return res.status(500).json({
    message:
      "Please, notify the administrator by email: " + process.env.ADMIN_EMAIL,
    error: err,
  });
}
