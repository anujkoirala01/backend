import { User } from "../model/model.js";

export let createUser = async (req, res) => {
  let userData = req.body;
  try {
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
