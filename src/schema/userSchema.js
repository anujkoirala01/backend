import { Schema } from "mongoose";

let userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password field is required."],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone Number is required."],
      minLength: 1000000000,
      maxLength: 9999999999,
    },
    gender: {
      type: String,
      required: [true, "Gender field is required."],
    },
    dob: {
      type: Date,
      required: [true, "DOB is required."],
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
