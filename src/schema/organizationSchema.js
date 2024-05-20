import { Schema } from "mongoose";

let organizationSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required."],
    },
    logo: {
      type: String,
      required: [true, "Logo is required."],
    },
    address: {
      country: {
        type: String,
        required: [true, "Country is required."],
      },
      state: {
        type: String,
        required: [true, "State is required."],
      },
      district: {
        type: String,
        required: [true, "District is required."],
      },
      locality: {
        type: String,
        required: [true, "Locality is required."],
      },
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone Number is required."],
      minLength: 1000000000,
      maxLength: 9999999999,
    },
  },
  {
    timestamps: true,
  }
);

export default organizationSchema;
