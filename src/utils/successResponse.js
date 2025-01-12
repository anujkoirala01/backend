const successResponse = (res, statusCode, message, result) => {
  res.status(statusCode).json({
    success: true,
    message: message,
    result: result,
  });
};

export default successResponse;
