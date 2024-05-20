import { User } from "../model/model.js";
import bcrypt from "bcrypt";

export let createUser = async (req, res) => {
  let userData = req.body;
  let password = userData.password;
  try {
    let hashPassword = await bcrypt.hash(password, 10); // 10 --> SaltRound
    userData.password = hashPassword;
    let result = await User.create(userData);
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
