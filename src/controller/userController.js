import { User } from "../model/model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { comparePassword, hash } from "../utils/hashing.js";
import { generateToken, verifyToken } from "../utils/token.js";
import { secretKey } from "../constant.js";

export let createUser = async (req, res) => {
  let userData = req.body;
  let password = userData.password;
  try {
    let hashPassword = await hash(password);
    userData.password = hashPassword;
    let result = await User.create(userData);
    await sendEmail({
      from: "AK",
      to: [req.body.email],
      subject: "Email Verification",
      html: `<h1>You have been successfully registered.</h1>`,
    });
    res.json({
      success: true,
      message: "User created successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let readUser = async (req, res) => {
  try {
    let result = await User.find({});
    res.json({
      success: true,
      message: "User Read Successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let loginUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  try {
    let user = await User.findOne({ email: email });

    if (user === null) {
      res.json({
        success: false,
        message: "Email does not match.",
      });
    } else {
      let hashPassword = await hash(password);
      let isValidPassword = await comparePassword(password, hashPassword);
      if (isValidPassword) {
        let infoObj = {
          id: user._id,
        };

        let expiryInfo = {
          expiresIn: "5d",
        };

        let token = generateToken(infoObj, secretKey, expiryInfo);

        res.json({
          success: true,
          message: "User logged in successfully.",
          result: token,
        });
      } else {
        res.json({
          success: false,
          message: "Password does not match.",
        });
      }
    }
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
    let result = await User.findById(id); // findById({id}) : passing an object {} --> Error: "Cast to ObjectId failed for value \"my-profile\" (type string)
    // at path \"_id\" for model \"User\"" /my-profile is not a id
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

export let deleteUser = async (req, res) => {
  let userId = req.params.usersId;
  try {
    let result = await User.findByIdAndDelete(userId);
    res.json({
      success: true,
      message: "User deleted successfully.",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let readUserById = async (req, res) => {
  let userId = req.params.usersId;
  try {
    let result = await User.findById(userId);
    res.json({
      success: true,
      message: "User read successfully by ID",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let updateUser = async (req, res) => {
  let userId = req.params.usersId;
  let userData = req.body;
  try {
    let result = await User.findByIdAndUpdate(userId, userData);
    res.json({
      success: true,
      message: "User updated successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
