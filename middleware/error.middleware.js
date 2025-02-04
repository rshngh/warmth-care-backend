export const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl} `);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  res.statusCode(500).json({
    msg: err.message,
  });
};
