import { Schema } from "mongoose";

let adminSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
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

export default adminSchema;
