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

function getReviewById(id) {
  return ReviewModel.findById(id);
}

function addReview(review, property_id) {
  const reviewToAdd = new reviewModel(review);
  reviewToAdd.property = property_id;
  const promise = reviewToAdd.save();
  return promise;
}

export default {
  getReviewById,
  addReview
};
