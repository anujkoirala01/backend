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
