const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");
const geocoder = require("../utils/geocoder");
//@desk Get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res
    .status(200)
    .json({ success: true, data: bootcamps, count: bootcamps.length });
});

//@desk Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const bootcamp = await Bootcamp.findById(id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

//@desk Create new bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootCamp
  });
});

//@desk Update bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootCamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootCamp
  });
});

//@desk Delete bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await Bootcamp.findByIdAndRemove(req.params.id);
  if (!bootCamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {}
  });
});

//@desk Get bootcamps within a radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  //get latitude and longitude from geocoder
  const loc = await geocoder.geocode(zipcode);
  // console.log("location: ", loc);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //calculate radius using radians
  //Divide distance by radius of earth
  //Eart radius = 3963 miles/6378 km
  const radius = distance / 6378;
  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] }
    }
  });
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});
