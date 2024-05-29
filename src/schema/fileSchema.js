import { Schema } from "mongoose";

let fileSchema = Schema({
  file: {
    type: String,
  },
});

export default fileSchema;
