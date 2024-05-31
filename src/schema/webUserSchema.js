import { Schema } from "mongoose";

let webUserSchema = Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName field is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required."],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password field is required."],
    },
    phoneNumber: {
      type: Number,
      required: [true, "phoneNumber is required."],
      minLength: 1000000000,
      maxLength: 9999999999,
    },
    gender: {
      type: String,
      required: [true, "gender field is required."],
    },
    dob: {
      type: Date,
      required: [true, "dob is required."],
    },
    role: {
      type: String,
      required: [true, "role is required."],
    },
    isVerifiedEmail: {
      type: Boolean,
      required: [true, "isVerifiedEmail is required."],
    },
  },
  {
    timestamps: true,
  }
);

export default webUserSchema;
