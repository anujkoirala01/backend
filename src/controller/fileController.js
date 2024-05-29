export let createFile = async (req, res) => {
  console.log(req.file);
  let link = `localhost:8000/${req.file.filename}`;
  res.json({
    success: true,
    message: "File Created Successfully",
    result: link,
  });
};

export let createMultipleFile = async (req, res) => {
  console.log(req.files);
  let links = req.files.map((value, i) => {
    let link = `localhost:8000/${value.filename}`;
    return link;
  });
  res.json({
    success: true,
    message: "Multiple File Created Successfully",
    result: links,
  });
};
