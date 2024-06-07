import { catchAsync } from "../utils/catchAsync";
import successResponse from "../utils/successResponse";

export let createFile = catchAsync(async (req, res) => {
  console.log(req.file);
  let link = `localhost:8000/${req.file.filename}`;
  successResponse(res, 201, "File Created Successfully", link);
});

export let createMultipleFile = catchAsync(async (req, res) => {
  console.log(req.files);
  let links = req.files.map((value, i) => {
    let link = `localhost:8000/${value.filename}`;
    return link;
  });
  successResponse(res, 201, "Multiple File Created Successfully", links);
});
