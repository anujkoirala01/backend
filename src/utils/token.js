import jwt from "jsonwebtoken";

export let generateToken =  (info, secretKey, expiryInfo) => {
  let _token =  jwt.sign(info, secretKey, expiryInfo);
  return _token;
};

export let verifyToken = (token, secretKey) => {
  let infoObj =  jwt.verify(token, secretKey);
  return infoObj;
};
