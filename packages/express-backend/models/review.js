import mongoose, { Schema } from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      trim: true
    },
    author: {
      type: String,
      trim: true
    },
    rating: {
      type: Number,
      required: true,
      trim: true
    },
    tags: {
      type: [String],
      trim: true
    },
    body: {
      type: String,
      required: true,
      trim: true
    }
  },
  { collection: "reviews" }
);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
