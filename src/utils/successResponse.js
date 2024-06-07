const successResponse = (res, statusCode, message, result = null) => {
  res.status(statusCode).json({
    success: true,
    message: message,
    result: result,
  });
};

export default successResponse;
