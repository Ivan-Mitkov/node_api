const Bootcamp=require('../models/Bootcamp');
//@desk Get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, masg: "Show all bootcamps" });
};

//@desk Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, masg: `Display bootcamp ${req.params.id}` });
};

//@desk Create new bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, masg: "Create new bootcamp" });
};

//@desk Update bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, masg: `Update bootcamp ${req.params.id}` });
};

//@desk Delete bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, masg: `Delete bootcamp ${req.params.id}` });
};
