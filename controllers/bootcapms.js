const Bootcamp = require("../models/Bootcamp");
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
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootCamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootCamp
    });
  } catch (error) {
    console.log(error.message.red);
    res.status(400).json({ success: false, error: error.message });
  }
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
