import { secretKey } from "../constant.js";
import { WebUser } from "../model/model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { comparePassword, hash } from "../utils/hashing.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateToken, verifyToken } from "../utils/token.js";

export const createWebUser = async (req, res) => {
  let webUserData = req.body;
  try {
    let hashPassword = await hash(webUserData.password);
    webUserData = {
      ...webUserData,
      isVerifiedEmail: false,
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
      html: `<h1>Your account has been created successfully.</h1>
      <a href="http://localhost:3000/verify-email?token=${token}">http://localhost:3000/verify-email?token=${token}</a>
      `,
    });
    res.status(201).json({
      success: true,
      message: "WebUser created successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  let bearerToken = req.headers.authorization;
  let token = bearerToken.split(" ")[1];
  try {
    let infoObj = verifyToken(token, secretKey);
    let id = infoObj.id;

    let result = await WebUser.findByIdAndUpdate(
      id,
      { isVerifiedEmail: true },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "User Verified Successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const loginWebUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  try {
    let user = await WebUser.findOne({ email: email });

    if (user) {
      if (user.isVerifiedEmail) {
        let hashPassword = await hash(password);
        let isValidPassword = await comparePassword(password, hashPassword);
        if (isValidPassword) {
          let infoObj = {
            _id: user._id,
          };

          let expiryInfo = {
            expiresIn: "5d",
          };

          let token = generateToken(infoObj, secretKey, expiryInfo);

          res.status(200).json({
            success: true,
            message: "WebUser logged in successfully.",
            data: user,
            token: token,
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
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  let _id = req._id;
  try {
    let result = await WebUser.findById(_id); // findById({id}) : passing an object {} --> Error: "Cast to ObjectId failed for value \"my-profile\" (type string)
    // at path \"_id\" for model \"WebUser\"" /my-profile is not a id
    res.status(200).json({
      success: true,
      message: "Profile Read Successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  let data = req.body;
  delete data.email;
  delete data.password;
  try {
    let result = await WebUser.findByIdAndUpdate(req._id, data, { new: true });
    res.status(201).json({
      success: true,
      message: "Profile updated successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    let data = await WebUser.findById(req._id);
    let hashPassword = data.password;
    let isValidPassword = await comparePassword(
      req.body.oldPassword,
      hashPassword
    );
    if (isValidPassword) {
      let newHashPassword = await hash(req.body.newPassword);

      let result = await WebUser.findByIdAndUpdate(
        req._id,
        { password: newHashPassword },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "Password Updated Successfully",

        result: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Old Password does not match.",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const readAllWebUser = async (req, res) => {
  try {
    let result = await WebUser.find({});
    res.status(200).json({
      success: true,
      message: "All WebUser Read Successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readWebUserById = async (req, res) => {
  let webUserId = req.params.id;
  try {
    let result = await WebUser.findById(webUserId);
    res.status(200).json({
      success: true,
      message: "WebUser read successfully by ID",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateWebUserById = async (req, res) => {
  let webUserData = req.body;
  delete webUserData.email;
  delete webUserData.password;
  try {
    let result = await WebUser.findByIdAndUpdate(req.params.id, webUserData, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "WebUser updated successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = catchAsync(async (req, res) => {
  let email = req.body.email;
  let result = await WebUser.findOne({ email: email });
  if (result) {
    let infoObj = {
      _id: result._id,
    };
    let expiryInfo = {
      expiresIn: "5d",
    };

    let token = generateToken(infoObj, secretKey, expiryInfo);

    await sendEmail({
      from: "'Web User'<noreply@test.com>",
      to: email,
      subject: "Reset Password",
      html: `<h1>click the link to reset your password .</h1>
        <a href="http://localhost:3000/reset-password?token=${token}">http://localhost:3000/reset-password?token=${token}</a>
        `,
    });

    res.status(200).json({
      success: true,
      message: "Link has been sent ,to reset password, to your email",
    });
  } else {
    res.json({
      success: false,
      message: "Email does not exist.",
    });
  }
});

export const resetPassword = catchAsync(async (req, res) => {
  let hashPassword = await hash(req.body.password);
  let result = await WebUser.findByIdAndUpdate(
    req._id,
    { password: hashPassword },
    { new: true }
  );

  res.status(201).json({
    success: true,
    message: "Password Reset Successfully",
    data: result,
  });
});

export const deleteWebUserById = async (req, res) => {
  let webUserId = req.params.id;
  try {
    let result = await WebUser.findByIdAndDelete(webUserId);
    res.status(200).json({
      success: true,
      message: "WebUser deleted successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
