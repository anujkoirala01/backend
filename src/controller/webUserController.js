import { WebUser } from "../model/model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { comparePassword, hash } from "../utils/hashing.js";
import { generateToken, verifyToken } from "../utils/token.js";
import { secretKey } from "../constant.js";

export let createWebUser = async (req, res) => {
  let webUserData = req.body;
  try {
    let hashPassword = await hash(webUserData.password);
    webUserData = {
      ...webUserData,
      isVerifiedEMail: false,
      password: hashPassword,
    };
    let result = await WebUser.create(webUserData);

    let infoObj = {
      id: result._id,
    };

    let expiryInfo = {
      expiresIn: "5d",
    };

    let token = generateToken(infoObj, secretKey, expiryInfo);

    await sendEmail({
      from: "'Web User'<noreply@test.com>",
      to: [webUserData.email],
      subject: "Email Verification",
      html: `<h1>Your account has been created successfully .</h1>
      <a href="http://localhost:3000/verify-email?token=${token}">http://localhost:3000/verify-email?token=${token}</a>
      `,
    });
    res.json({
      success: true,
      message: "WebUser created successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let verifyEmail = async (req, res) => {
  let bearerToken = req.headers.authorization;
  let token = bearerToken.split(" ")[1];
  try {
    let infoObj = verifyToken(token, secretKey);
    let id = infoObj.id;

    let result = await WebUser.findByIdAndUpdate(
      id,
      { isVerifiedEMail: true },
      { new: true }
    );
    res.json({
      success: true,
      message: "User Verified Successfully.",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

export let loginWebUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  try {
    let webUser = await WebUser.findOne({ email: email });

    if (webUser) {
      if (webUser.isVerifiedEMail) {
        let hashPassword = await hash(password);
        let isValidPassword = await comparePassword(password, hashPassword);
        if (isValidPassword) {
          let infoObj = {
            id: webUser._id,
          };

          let expiryInfo = {
            expiresIn: "5d",
          };

          let token = generateToken(infoObj, secretKey, expiryInfo);

          res.json({
            success: true,
            message: "WebUser logged in successfully.",
            result: token,
          });
        } else {
          let error = new Error("Credential does not match");
          throw error;
        }
      } else {
        let error = new Error("Credential not found");
        throw error;
      }
    } else {
      let error = new Error("Credential not found");
      throw error;
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let readWebUser = async (req, res) => {
  try {
    let result = await WebUser.find({});
    res.json({
      success: true,
      message: "WebUser Read Successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let myProfile = async (req, res) => {
  let bearerToken = req.headers.authorization;
  let token = bearerToken.split(" ")[1];
  try {
    let infoObj = verifyToken(token, secretKey);
    let id = infoObj.id;
    let result = await WebUser.findById(id); // findById({id}) : passing an object {} --> Error: "Cast to ObjectId failed for value \"my-profile\" (type string)
    // at path \"_id\" for model \"WebUser\"" /my-profile is not a id
    res.json({
      success: true,
      message: "Profile Read Successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let deleteWebUser = async (req, res) => {
  let webUserId = req.params.webUsersId;
  try {
    let result = await WebUser.findByIdAndDelete(webUserId);
    res.json({
      success: true,
      message: "WebUser deleted successfully.",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let readWebUserById = async (req, res) => {
  let webUserId = req.params.webUsersId;
  try {
    let result = await WebUser.findById(webUserId);
    res.json({
      success: true,
      message: "WebUser read successfully by ID",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let updateWebUser = async (req, res) => {
  let webUserId = req.params.webUsersId;
  let webUserData = req.body;
  try {
    let result = await WebUser.findByIdAndUpdate(webUserId, webUserData);
    res.json({
      success: true,
      message: "WebUser updated successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
