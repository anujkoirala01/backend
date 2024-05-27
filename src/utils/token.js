import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export let generateToken = expressAsyncHandler(
  async (info, secretKey, expiryInfo) => {
    let _token = await jwt.sign(info, secretKey, expiryInfo);
    return _token;
  }
);

export let verifyToken = expressAsyncHandler(async (token, secretKey) => {
  let infoObj = await jwt.verify(token, secretKey);
  return infoObj;
});
