const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for the review"],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, "Please add some text"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 and 10"]
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  }
});

//Prevent user from submitting more than one review per bootcamp
//https://docs.mongodb.com/manual/core/index-compound/
// https://docs.mongodb.com/manual/core/index-unique/
//Must create index in the Atlas to work
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

//Aggregation static method to get average rating
ReviewSchema.statics.getAverageRating = async function(bootcampId) {
  // check if working
  console.log("Chek average pre and post".blue);
  const obj = await this.aggregate([
    {
      $match: {
        bootcamp: bootcampId
      }
    },
    {
      $group: {
        _id: "$bootcamp",
        averageRating: {
          $avg: "$rating"
        }
      }
    }
  ]);
  console.log(obj);
  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageRating: obj[0].averageRating
    });
  } catch (error) {
    console.log(err);
  }
};

//Aggregation call getAverageRating after save
ReviewSchema.post("save", function() {
  this.constructor.getAverageRating(this.bootcamp);
});
//Aggregation call getAverageRating before delete
ReviewSchema.pre("remove", function() {
  this.constructor.getAverageRating(this.bootcamp);
});
module.exports = mongoose.model("Review", ReviewSchema);
