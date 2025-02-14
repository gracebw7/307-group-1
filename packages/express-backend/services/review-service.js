import mongoose from "mongoose";
import reviewModel from "../models/review.js";

mongoose.set("debug", true);

/*
mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));
*/
function getReviews() {
  return reviewModel.find();
}

function getReviewById(id) {
  return reviewModel.findById(id);
}

function addReview(review, property_id) {
  const reviewToAdd = new reviewModel(review);
  reviewToAdd.property = property_id;
  const promise = reviewToAdd.save();
  return promise;
}

function deleteReviewById(id) {
  return reviewModel.findByIdAndDelete(id);
}

export default {
  getReviewById,
  addReview,
  deleteReviewById,
  getReviews
};
