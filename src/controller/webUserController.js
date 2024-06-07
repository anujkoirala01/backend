import { secretKey } from "../constant.js";
import { WebUser } from "../model/model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { comparePassword, hash } from "../utils/hashing.js";
import { sendEmail } from "../utils/sendEmail.js";
import successResponse from "../utils/successResponse.js";
import { generateToken, verifyToken } from "../utils/token.js";

export const createWebUser = catchAsync(async (req, res) => {
  let webUserData = req.body;
  const hashPassword = await hash(webUserData.password);
  webUserData = {
    ...webUserData,
    isVerifiedEmail: false,
    password: hashPassword,
  };
  const result = await WebUser.create(webUserData);

  const infoObj = {
    id: result._id,
  };

  const expiryInfo = {
    expiresIn: "5d",
  };

  const token = generateToken(infoObj, secretKey, expiryInfo);

  await sendEmail({
    from: "'Web User'<noreply@test.com>",
    to: [webUserData.email],
    subject: "Email Verification",
    html: `<h1>Your account has been created successfully.</h1>
      <a href="http://localhost:3000/verify-email?token=${token}">http://localhost:3000/verify-email?token=${token}</a>
      `,
  });

  successResponse(res, 201, "WebUser created successfully", result);
});

export const verifyEmail = catchAsync(async (req, res) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];
  const infoObj = verifyToken(token, secretKey);
  const id = infoObj.id;

  const result = await WebUser.findByIdAndUpdate(
    id,
    { isVerifiedEmail: true },
    { new: true }
  );
  successResponse(res, 201, "User Verified Successfully.", result);
});

export const loginWebUser = catchAsync(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await WebUser.findOne({ email: email });

  if (user) {
    if (user.isVerifiedEmail) {
      const hashPassword = await hash(password);
      const isValidPassword = await comparePassword(password, hashPassword);
      if (isValidPassword) {
        const infoObj = {
          _id: user._id,
        };

        const expiryInfo = {
          expiresIn: "5d",
        };

        const token = generateToken(infoObj, secretKey, expiryInfo);

        successResponse(res, 200, "WebUser logged in successfully.", token);
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
});

export const myProfile = catchAsync(async (req, res) => {
  const result = await WebUser.findById(req._id); // findById({id}) : passing an object {} --> Error: "Cast to ObjectId failed for value \"my-profile\" (type string)
  // at path \"_id\" for model \"WebUser\"" /my-profile is not a id

  successResponse(res, 200, "Profile Read Successfully", result);
});

export const updateProfile = catchAsync(async (req, res) => {
  const data = req.body;
  delete data.email;
  delete data.password;

  const result = await WebUser.findByIdAndUpdate(req._id, data, { new: true });

  successResponse(res, 201, "Profile updated successfully", result);
});

export const updatePassword = catchAsync(async (req, res) => {
  const data = await WebUser.findById(req._id);
  const hashPassword = data.password;
  const isValidPassword = await comparePassword(
    req.body.oldPassword,
    hashPassword
  );
  if (isValidPassword) {
    const newHashPassword = await hash(req.body.newPassword);

    const result = await WebUser.findByIdAndUpdate(
      req._id,
      { password: newHashPassword },
      { new: true }
    );
    successResponse(res, 201, "Password Updated Successfully", result);
  } else {
    let error = new Error("Old Password does not match.");
    throw error;
  }
});

export const readAllWebUser = catchAsync(async (req, res) => {
  const result = await WebUser.find({});
  successResponse(res, 200, "All WebUser Read Successfully", result);
});

export const readWebUserById = catchAsync(async (req, res) => {
  const result = await WebUser.findById(req.params.id);
  successResponse(res, 200, "WebUser read successfully by ID", result);
});

export const updateWebUserById = catchAsync(async (req, res) => {
  const webUserData = req.body;
  delete webUserData.email;
  delete webUserData.password;
  const result = await WebUser.findByIdAndUpdate(req.params.id, webUserData, {
    new: true,
  });
  successResponse(res, 201, "WebUser updated successfully", result);
});

export const forgotPassword = catchAsync(async (req, res) => {
  const email = req.body.email;
  const result = await WebUser.findOne({ email: email });
  if (result) {
    const infoObj = {
      _id: result._id,
    };
    const expiryInfo = {
      expiresIn: "5d",
    };

    const token = generateToken(infoObj, secretKey, expiryInfo);

    await sendEmail({
      from: "'Web User'<noreply@test.com>",
      to: email,
      subject: "Reset Password",
      html: `<h1>click the link to reset your password .</h1>
        <a href="http://localhost:3000/reset-password?token=${token}">http://localhost:3000/reset-password?token=${token}</a>
        `,
    });
    successResponse(
      res,
      200,
      "A link has been sent to your email to reset your password."
    );
  } else {
    let error = new Error("Email does not exist.");
    throw error;
  }
});

export const resetPassword = catchAsync(async (req, res) => {
  const hashPassword = await hash(req.body.password);
  const result = await WebUser.findByIdAndUpdate(
    req._id,
    { password: hashPassword },
    { new: true }
  );
  successResponse(res, 201, "Password Reset Successfully", result);
});

export const deleteWebUserById = catchAsync(async (req, res) => {
  const result = await WebUser.findByIdAndDelete(req.params.id);
  successResponse(res, 200, "WebUser deleted successfully.", result);
});
