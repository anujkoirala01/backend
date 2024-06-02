import { secretKey } from "../constant";
import { verifyToken } from "../utils/token";

let isAuthenticated = async (req, res, next) => {
  let tokenString = req.headers.authorization;
  let token = tokenString.split(" ")[1];
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
