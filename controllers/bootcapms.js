const Bootcamp = require("../models/Bootcamp");
//@desk Get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {
    console.log(error.message.red);
    res.status(400).json({ success: false, error: error.message });
  }
};

//@desk Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = async (req, res, next) => {
  const id = req.params.id;
  try {
    const bootcamp = await Bootcamp.findById(id);
    if (!bootcamp) {
     return res.status(400).json({ success: false, error: error.message });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    console.log(error.message.red);
    res.status(400).json({ success: false, error: error.message });
  }
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
