function notFound(req, res) {
  res.status(404).json({ error: "Not Found" });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = Number(err.statusCode || err.status || 500);
  const message =
    status >= 500 ? "Internal Server Error" : err.message || "Request failed";

  if (process.env.NODE_ENV !== "production") {
    // Helpful in development
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== "production" ? { details: err.message } : {}),
  });
}

module.exports = { notFound, errorHandler };
