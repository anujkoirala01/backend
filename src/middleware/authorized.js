import { WebUser } from "../model/model.js";

const authorized = (roles) => {
  return catchAsync(async (req, res, next) => {
    let result = await WebUser.findById(req._id);
    let tokenRole = result.role;
    if (roles.includes(tokenRole)) {
      next();
    } else {
      res.status(403).res({
        success: false,
        message: "User not authorized.",
      });
    }
  });
};

export default authorized;
