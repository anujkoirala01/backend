import { WebUser } from "../model/model.js";
import { catchAsync } from "../utils/catchAsync.js";

const isAuthorized = (roles) => {
  return catchAsync(async (req, res, next) => {
    let result = await WebUser.findById(req._id);
    if (roles.includes(result.role)) {
      next();
    } else {
      res.status(403).res({
        success: false,
        message: "Access Denied.",
      });
    }
  });
};

export default isAuthorized;
