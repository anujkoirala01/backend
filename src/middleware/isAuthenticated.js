import { secretKey } from "../constant.js";
import { verifyToken } from "../utils/token.js";

let isAuthenticated = async (req, res, next) => {
  let bearerToken = req.headers.authorization;
  let token = bearerToken.split(" ")[1];
  try {
    let user = verifyToken(token, secretKey);
    req._id = user._id;
    next();
  } catch (error) {
    res.status(401).json({
      success: true,
      message: error.message,
    });
  }
};

export default isAuthenticated;
