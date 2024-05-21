import { User } from "../model/model.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";

export let createUser = async (req, res) => {
  let userData = req.body;
  let password = userData.password;
  try {
    let hashPassword = await bcrypt.hash(password, 10); // 10 --> SaltRound
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
      let hashPassword = bcrypt.hash(password, 10);
      let isValidPassword = bcrypt.compare(password, hashPassword);
      if (isValidPassword) {
        res.json({
          success: true,
          message: "User logged in successfully.",
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
